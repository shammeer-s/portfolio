// --- Setup for the first tabs component ---
const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content");

const activateTab = (targetId) => {
    allTabs.forEach(tab => {
        if (tab.id === `${targetId}-content`) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });
};

allLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.id;
        allLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        activateTab(targetId);
    });
});

let activeLink = allLinks[0];
activeLink.classList.add("active");
activateTab(activeLink.id);

// --- Setup for the second card component ---
const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");
const floater = document.querySelector(".floater");

const handleButtonClick = (event) => {
    const sectionId = event.target.getAttribute("data-section");
    const section = document.querySelector(sectionId);

    if (floater) {
        if (sectionId === "#experience" || sectionId === "#contact") {
            floater.style.display = "none";
        } else {
            floater.style.display = "block";
        }
    }

    if (sectionId !== "#about") {
        card.classList.add("is-active");
    } else {
        card.classList.remove("is-active");
    }

    card.setAttribute("data-state", sectionId);
    sections.forEach(s => s.classList.remove("is-active"));
    buttons.forEach(b => b.classList.remove("is-active"));
    event.target.classList.add("is-active");
    section.classList.add("is-active");
};

buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});


$('[data-github]').each(function () {
    const _this = this;
    const repo = $(_this).data('github');


    fetch('https://api.github.com/repos/' + repo, {
        headers: {
            'Authorization': `token ${secrets.token}`
        }
    })
        .then(response => response.json())
        .then(response => {
            // Check if the response has a message (e.g., "Not Found" or API rate limit exceeded)
            if (response.message) {
                console.error(`GitHub API error for repo ${repo}:`, response.message);
                return;
            }
            $(_this).find('[data-forks]').text(response.forks_count);
            $(_this).find('[data-stars]').text(response.stargazers_count);
        })
        .catch(error => {
            console.error(`Error fetching data for repo ${repo}:`, error);
        });
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Select all anchor tags on the page
    const links = document.querySelectorAll('a');

    // Loop through each link
    links.forEach(link => {
        // Set the target attribute to '_blank' to open in a new tab
        link.setAttribute('target', '_blank');

        // It's also good practice for security to add rel="noopener noreferrer"
        link.setAttribute('rel', 'noopener noreferrer');
    });
});
