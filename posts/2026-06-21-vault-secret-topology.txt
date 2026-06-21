---
title: "Secret Topology in HashiCorp Vault"
date: "2026-06-21"
tags: [vault, secrets, security, devops]
excerpt: "How to structure mount paths, policies, and auth methods so that Vault scales cleanly across teams and environments."
---

# Secret Topology in HashiCorp Vault

Vault gives you enormous flexibility in how you organize secrets. That flexibility becomes a liability at scale if you don't make deliberate choices early. This post covers the structural decisions — mount paths, namespace hierarchy, policy topology, and auth method placement — that keep a Vault cluster manageable as teams and services multiply.

## Start with the secret engine mount

Every secret engine is mounted at a path. The path is the first load-bearing decision because policies, audit logs, and access patterns all reference it. A flat layout like this falls apart fast:

```
secret/
secret/db-password
secret/api-key
secret/tls-cert
```

Instead, treat the mount path as a namespace boundary. A layered scheme gives you clean policy surfaces:

```
<team>/<environment>/<service>/<secret>

platform/prod/postgres/root-password
platform/prod/postgres/app-password
payments/staging/stripe/api-key
payments/prod/stripe/api-key
```

The four-segment pattern (`team/env/service/secret`) is a good starting point. You can enforce it with a naming convention document, and you can write terse policies against it with glob wildcards.

## One KV mount per trust boundary, not per team

A common mistake is mounting a separate `kv` engine for every team:

```
# bad — ACL enforcement lives in the mount, not the path
kv-platform/
kv-payments/
kv-identity/
```

This spreads your audit surface and makes cross-team references awkward. Better to have a small number of mounts that correspond to **trust domains** (prod vs. non-prod is the most important boundary) and enforce team isolation through path-based policies:

```
# prod secrets — one mount, path-based isolation
secret/prod/platform/...
secret/prod/payments/...

# non-prod — separate mount so blast radius is contained
secret/nonprod/platform/...
secret/nonprod/payments/...
```

Keeping prod on its own mount means you can apply a stricter audit filter, a shorter default lease TTL, and a separate set of seal/unseal keys — all at the engine level.

## Policy topology follows path topology

Vault ACL policies are additive and path-scoped. If your path topology is clean, your policies almost write themselves:

```hcl
# payments-prod-read.hcl
path "secret/prod/payments/*" {
  capabilities = ["read", "list"]
}

# payments-prod-write.hcl
path "secret/prod/payments/*" {
  capabilities = ["create", "update", "delete", "list"]
}
```

Assign the narrowest policy to each auth entity. Applications get only `read`. CI/CD pipelines get `create` and `update` for their own path. The Vault admin team gets `sudo` on a restricted set of admin paths only.

Avoid the temptation of a single wide policy:

```hcl
# bad — wide open
path "secret/*" {
  capabilities = ["read", "create", "update", "delete"]
}
```

Even if it's only assigned to one app today, it will be copy-pasted by the fifth person who needs access.

## Auth method placement

Each auth method mount is also a path. Layer them the same way:

```
auth/kubernetes-prod/
auth/kubernetes-staging/
auth/github-team-platform/
auth/approle-cicd/
```

Keeping environment-specific auth mounts separate lets you tune the token TTL and max lease differently per environment. A Kubernetes pod in staging probably should have a 1-hour token. A prod service mesh sidecar probably should have a 15-minute token with renewal.

For human access, use `auth/github` or an OIDC provider. Avoid issuing long-lived tokens to humans — Vault's GitHub auth will generate a token on every `vault login` and let the TTL enforce rotation automatically.

## Dynamic secrets are the goal

Static KV secrets are a stepping stone. Wherever you can, swap them for dynamic secrets with Vault's database, AWS, or PKI engines. Dynamic credentials have a TTL baked in, are auditable per-issuance, and are revocable instantly:

```bash
# Instead of storing a static postgres password:
vault secrets enable database
vault write database/config/payments-prod \
    plugin_name=postgresql-database-plugin \
    connection_url="postgresql://{{username}}:{{password}}@postgres.prod:5432/payments" \
    allowed_roles="payments-app"

vault write database/roles/payments-app \
    db_name=payments-prod \
    creation_statements="CREATE ROLE \"{{name}}\" ..." \
    default_ttl="1h" \
    max_ttl="24h"
```

Now every app instance gets its own scoped credentials that expire automatically and show up as distinct entries in the audit log.

## Leases and TTLs as first-class topology

Lease TTLs are as much a part of your topology as path names. Set them intentionally at three levels:

1. **Mount-level defaults** — set `default_lease_ttl` and `max_lease_ttl` on the engine mount itself
2. **Role-level overrides** — roles (database, PKI, AWS) can shorten but not lengthen the mount ceiling
3. **Request-level overrides** — callers can request shorter TTLs; use this in automation to get exactly the lease length needed

A good rule of thumb: max TTL should be no longer than your incident response SLA. If your team can rotate a leaked credential within 2 hours, a 2-hour max TTL on database credentials is a meaningful control.

## Namespaces for multi-team isolation

If you're on Vault Enterprise, namespaces give you hard multi-tenancy. Each namespace has its own auth methods, secret engines, and policies — completely isolated from others:

```
root/
  platform/
    auth/kubernetes/
    secret/
  payments/
    auth/kubernetes/
    secret/
```

In OSS Vault, you simulate this with mount path discipline and policy enforcement. The path convention matters even more in that case because it's your only structural guardrail.

## A practical checklist

- [ ] One KV mount per trust boundary (at minimum: prod / non-prod)
- [ ] Path scheme: `team/env/service/secret`
- [ ] Policies named to match the paths they cover
- [ ] Separate auth mounts per environment, not per team
- [ ] Dynamic secrets for databases, cloud credentials, and TLS wherever possible
- [ ] TTLs set at the mount level, not left at default
- [ ] Audit logging enabled and shipping to a SIEM
- [ ] Break-glass procedure documented and tested quarterly

The topology decisions you make in month one will be load-bearing for years. Spend the time to get the mount structure right before your first team onboards, and policy management stays boring — which is exactly what you want from a secrets store.
