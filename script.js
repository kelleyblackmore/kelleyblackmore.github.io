// Function to open a specific section
function openSection(evt, sectionName) {
    var i, tabcontent, tablinks;

    // Hide all sections
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current section and add an active class to the button
    document.getElementById(sectionName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// By default, open the Geography section
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tablink').click();

    // Initialize accordions
    var acc = document.getElementsByClassName("accordion-button");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});

// Function to save form data to localStorage
function saveData(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input, textarea");
    const data = {};
    inputs.forEach(input => {
        data[input.name] = input.value;
    });
    localStorage.setItem(formId, JSON.stringify(data));
    alert("Data saved successfully!");
}

// Function to download all saved data as JSON
function downloadData() {
    const sections = document.querySelectorAll("section.tabcontent");
    const assessmentData = {};

    sections.forEach(section => {
        const sectionName = section.querySelector("h2").innerText;
        const forms = section.querySelectorAll("form");
        assessmentData[sectionName] = {};

        forms.forEach(form => {
            const formId = form.id;
            const data = JSON.parse(localStorage.getItem(formId)) || {};
            assessmentData[sectionName][formId] = data;
        });
    });

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(assessmentData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "CA_Assessment_South_Torbia.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}