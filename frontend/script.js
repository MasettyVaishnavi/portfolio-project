// Scroll to Projects
function scrollToProjects() {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

// Load Projects from Backend
fetch("https://portfolio-project-production-93a1.up.railway.app/projects")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("projects-container");

        data.forEach(project => {
            const projectCard = `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.github_link}" target="_blank">GitHub</a>
                    <a href="${project.live_link}" target="_blank">Live</a>
                </div>
            `;
            container.innerHTML += projectCard;
        });
    })
    .catch(error => console.log("Error fetching projects:", error));

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch("https://portfolio-project-production-93a1.up.railway.app/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => {
        alert("Message sent successfully ✅");
        document.getElementById("contactForm").reset();
    })
    .catch(error => console.log("Error:", error));
});