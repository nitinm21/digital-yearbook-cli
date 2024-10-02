// Profile class
class Profile {
    constructor(image, name, jobTitle, company, cohort, linkedinURL) {
        this.image = image;
        this.name = name;
        this.jobTitle = jobTitle;
        this.company = company;
        this.cohort = cohort;
        this.linkedinURL = linkedinURL;
    }
}

// List of profiles
const profiles = [
    new Profile('images/image1.png', 'Sarah Thomas', 'Software Engineer', 'Google', '2023', 'https://www.linkedin.com/in/nitin-murali/'),
    new Profile('images/image2.png', 'John Doe', 'Data Scientist', 'Apple', '2025', 'https://www.linkedin.com/in/nitin-murali/'),
    new Profile('images/image3.png', 'Jane Smith', 'UX Designer', 'Facebook', '2024', 'https://www.linkedin.com/in/nitin-murali/'),
];

// Function to display profiles
function displayProfiles(profilesToDisplay) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = '';

    profilesToDisplay.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        profileDiv.innerHTML = `
            <img src="${profile.image}" alt="${profile.name}">
            <h2>${profile.name}</h2>
            <p>${profile.jobTitle}</p>
            <p>${profile.company}</p>
            <p>Cohort: ${profile.cohort}</p>
            <img src="images/linkedin-icon.png" alt="LinkedIn" class="linkedin-icon">
        `;

        // Add click event to open LinkedIn profile
        profileDiv.addEventListener('click', () => {
            window.open(profile.linkedinURL, '_blank');
        });

        profileContainer.appendChild(profileDiv);
    });
}

// Filter profiles by cohort
document.getElementById('cohort-filter').addEventListener('change', function() {
    const selectedCohort = this.value;

    if (selectedCohort === 'all') {
        displayProfiles(profiles);
    } else {
        const filteredProfiles = profiles.filter(profile => profile.cohort === selectedCohort);
        displayProfiles(filteredProfiles);
    }
});

// Initial display of all profiles
displayProfiles(profiles);
// Track the LinkedIn icon element
const linkedinIcon = document.querySelector('images/linkedin-icon.png');

// Function to display the LinkedIn icon and track the cursor
function floatLinkedInIcon(event) {
    linkedinIcon.style.display = 'block'; // Show the icon
    linkedinIcon.style.left = `${event.pageX + 10}px`; // Offset to the right
    linkedinIcon.style.top = `${event.pageY + 10}px`; // Offset down
}

// Add mousemove event listener to the document
document.addEventListener('mousemove', (event) => {
    // Only display the icon if the cursor is over a profile
    const profiles = document.querySelectorAll('.profile');
    let isOverProfile = false;

    profiles.forEach(profile => {
        const rect = profile.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
            isOverProfile = true; // Mouse is over a profile
        }
    });

    if (isOverProfile) {
        floatLinkedInIcon(event); // Call to float the icon
    } else {
        linkedinIcon.style.display = 'none'; // Hide if not over a profile
    }
});

// Ensure to hide the icon when leaving the profiles
document.addEventListener('mouseleave', () => {
    linkedinIcon.style.display = 'none'; // Hide on mouse leave
});

