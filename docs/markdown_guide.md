# Markdown Guide

## Basic Markdown Syntax

### Headings
- Use `#` symbols to create headings. One `#` for a top-level heading, up to six `######` for the smallest subheading&#8203;:contentReference[oaicite:0]{index=0}.
- Example: 
  ```
  # Heading 1
  ## Heading 2
  ###### Heading 6
  ```
  (The number of `#` determines the heading level.)

### Emphasis (Bold, Italic, Strikethrough)
- *Italic*: Wrap text in one `*` or `_` on each side. For example, `*italic*` or `_italic_` renders as *italic*&#8203;:contentReference[oaicite:1]{index=1}.
- **Bold**: Use two `**` or `__` on each side. For example, `**bold**` or `__bold__` renders as **bold**&#8203;:contentReference[oaicite:2]{index=2}.
- ***Bold and Italic***: Use three symbols. For example, `***bold italic***` renders as ***bold italic***.
- ~~Strikethrough~~ (if supported): Wrap text in `~~`. For example, `~~strike~~` renders as ~~strike~~&#8203;:contentReference[oaicite:3]{index=3}.

### Lists
- **Unordered lists**: Start each item with `-`, `*`, or `+` followed by a space&#8203;:contentReference[oaicite:4]{index=4}.
  - Example:
    ```
    - Item A
    - Item B
    * Item C
    ```
- **Ordered lists**: Start each item with a number and a period (`1.`, `2.`, `3.`)&#8203;:contentReference[oaicite:5]{index=5}.
  - Example:
    ```
    1. First item
    2. Second item
    3. Third item
    ```
- *Nested lists*: Indent items by 4 spaces or one tab to create sub-lists under a parent item.

### Links
- **Inline links**: Use the format `[link text](URL)`. For example, `[OpenAI](https://openai.com)` creates a hyperlink&#8203;:contentReference[oaicite:6]{index=6}.
- **Reference links** (alternative): You can define the URL separately. For example:
  ```
  This is [OpenAI][openai-link] for more info.

  [openai-link]: https://openai.com
  ```
  This will render the same as an inline link, using the reference label.

### Images
- Use an exclamation mark `!` followed by alt text in brackets, and the image URL in parentheses: `![alt text](image_url "optional title")`&#8203;:contentReference[oaicite:7]{index=7}.
- Example: `![Logo](https://example.com/logo.png "Project Logo")` will display the image **Logo** with "Project Logo" as the tooltip.

### Inline Code
- To denote inline code or a command, wrap text in single backticks. For example, ``Use `code` to format text`` will display `code` in a monospaced font&#8203;:contentReference[oaicite:8]{index=8}.

## Advanced Markdown Features

### Code Blocks
- Use triple backticks (\`\`\`) on separate lines to create a fenced code block&#8203;:contentReference[oaicite:9]{index=9}. Optionally, specify a language after the first trio of backticks for syntax highlighting (e.g., \`\`\`python).
- Example:
  \`\`\`python
  def hello():
      print("Hello, world!")
  \`\`\`
  (This will produce a code block with Python syntax highlighting.)
- Alternatively, indent each line by 4 spaces to create a code block (without fencing).

### Blockquotes
- Start a line with `>` to turn it into a blockquote (for quoting text)&#8203;:contentReference[oaicite:10]{index=10}.
- Example:
  ```
  > This is a quote.
  > It can span multiple lines.
  ```
  This will appear as an indented block with a vertical line on the left. Nest `>` symbols (e.g., `>>`) for nested quotes.

### Horizontal Rules
- Insert a horizontal rule (divider) with three or more hyphens, asterisks, or underscores on a line by themselves (e.g. `---`)&#8203;:contentReference[oaicite:11]{index=11}.
- It’s good practice to have blank lines before and after a horizontal rule for clarity.

### Tables
- Create tables using pipes `|` to separate columns and hyphens `-` to create the header row&#8203;:contentReference[oaicite:12]{index=12}. For example:
  ```
  | Column 1 | Column 2 |
  | -------- | -------- |
  | Data A   | Data B   |
  | Data C   | Data D   |
  ```
- **Alignment**: Control text alignment in columns by adding colons in the header row&#8203;:contentReference[oaicite:13]{index=13}:
  - `:---` (left-align), `:---:` (center-align), `---:` (right-align).

### Footnotes
- Footnotes let you add references without cluttering the text. They are supported by some Markdown processors (e.g., GitHub Flavored Markdown)&#8203;:contentReference[oaicite:14]{index=14}.
- To add a footnote, insert a reference like `[^1]` in the text, and a corresponding definition anywhere in the document:
  ```
  This is a statement with a footnote reference.[^1]

  [^1]: Footnote content goes here.
  ```
- The text `[^\[1\]]` will render as a superscript link (e.g., 1) that readers can click to jump to the footnote content at the bottom of the page.

## Special Markdown Elements

### Task Lists (Checkboxes)
- To create a checklist or task list, use list syntax with square brackets. Begin items with `- [ ]` for open tasks and `- [x]` for completed tasks&#8203;:contentReference[oaicite:15]{index=15}.
- Example:
  ```
  - [x] Write introduction
  - [ ] Add more examples
  - [ ] Review and publish
  ```
  This will render as a list of tasks with checkboxes (checked for completed items).

### Emojis
- You can include emojis in Markdown. Many platforms support **emoji shortcodes** where you wrap an emoji name with colons (e.g., `:smile:`) to display 😀&#8203;:contentReference[oaicite:16]{index=16}. For example, `I love Markdown :heart_eyes:` would show a 😍 emoji on supporting platforms.
- Alternatively, you can copy and paste actual emoji characters directly into your text.
- *Note:* Emoji shortcodes (like `:heart_eyes:`) are platform-specific. On GitHub, for instance, typing `:+1:` yields a 👍.

## Tips for Using Markdown Effectively

- **Line Breaks & Paragraphs**: To start a new paragraph, leave a blank line. To insert a line break within a paragraph without starting a new one, end a line with two spaces or use `<br>`.
- **Escaping Characters**: If you need to display a literal Markdown symbol (like `*`, `_`, `` ` ``, etc.), prefix it with a backslash (e.g., `\*`)&#8203;:contentReference[oaicite:17]{index=17}. This prevents Markdown from interpreting it as formatting.
- **Consistency**: Use a consistent style for your Markdown. For example, prefer using asterisks for emphasis rather than underscores to avoid ambiguity&#8203;:contentReference[oaicite:18]{index=18}.
- **Readability**: Even in raw form, Markdown is meant to be readable. Use headings, lists, and spacing to organize content. Keep sentences and paragraphs concise for easier editing and review.
- **Preview & Validate**: Always preview your Markdown output if possible, especially when using advanced elements like tables or footnotes, to ensure it renders as expected.
- **Learn from Resources**: Refer to the [Markdown Guide](https://www.markdownguide.org) for a full tutorial, or GitHub’s guide *"[Mastering Markdown](https://guides.github.com/features/mastering-markdown/)"* for more tips and advanced usage.

## Examples

Here are some standalone examples of Markdown in action:

- **Header and Paragraph**: 
  ```
  # Documentation Title

  This is a paragraph with some text.
  ```
  *Explanation:* Creates a top-level heading and a paragraph of text.

- **Emphasis**: 
  ```
  Markdown is _lightweight_ and **easy** to learn.
  ```
  *Explanation:* Renders "_lightweight_" as italic and "**easy**" as bold.

- **List**:
  ```
  Shopping List:
  - Apples  
  - Oranges  
  - Bananas  
  ```
  *Explanation:* "Shopping List:" is a regular line, followed by a bullet list of items.

- **Link and Image**:
  ```
  Check out the [project website](https://example.com).

  ![Screenshot](https://example.com/screenshot.png "Screenshot of Project")
  ```
  *Explanation:* The first line creates a hyperlink to the project website. The second part displays an image with alt text "Screenshot" and a title.

- **Blockquote**:
  ```
  > "Markdown is great for documentation."
  > — A Happy User
  ```
  *Explanation:* Displays a quoted line with a source, formatted as a blockquote.

- **Code Block**:
  \`\`\`javascript
  function add(a, b) {
    return a + b;
  }
  \`\`\`
  *Explanation:* Shows a fenced code block with JavaScript code and appropriate syntax highlighting.

- **Table**:
  ```
  | Product   | Price |
  |----------|-------|
  | Pen       | $1    |
  | Notebook  | $5    |
  ```
  *Explanation:* Creates a table with two columns: "Product" and "Price", and two data rows.

- **Task List with Emoji**:
  ```
  To-Do:
  - [ ] Write docs :memo:  
  - [x] Add tests :white_check_mark:
  ```
  *Explanation:* Creates a to-do list with one unchecked and one checked item. The `:memo:` and `:white_check_mark:` will render as 📓 and ✅ emoji (on platforms that support it), next to each task.
