// ==========================================
// Bella Vista Restaurant
// Booking & Feedback Form
// Muhammad Hashir Portfolio
// ==========================================

const THEME_STORAGE_KEY = "portfolio-theme";

function applyTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }
}

function initializeThemeToggle() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = !document.body.classList.contains("dark-theme");
            localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
            applyTheme(isDark);
        });
    }
}

initializeThemeToggle();

function generateEmail() {

    // Get values from the form

    const name = document.getElementById("customerName").value;

    const email = document.getElementById("customerEmail").value;

    const requestType = document.getElementById("requestType").value;

    const bookingDate = document.getElementById("bookingDate").value;

    const message = document.getElementById("customerMessage").value;


    // Basic validation

    if (name === "" || email === "") {

        alert("Please complete all required fields.");

        return;

    }


    // Email subject

    const subject = encodeURIComponent(requestType + " - " + name);


    // Email body

    const body = encodeURIComponent(

        "Customer Name: " + name +

        "\n\nEmail Address: " + email +

        "\n\nRequest Type: " + requestType +

        "\n\nPreferred Date: " + bookingDate +

        "\n\nMessage:\n" + message

    );


    // Restaurant email

    const restaurantEmail = "info@bellavista.co.uk";


    // Open default email application

    window.location.href =
        "mailto:" + restaurantEmail +
        "?subject=" + subject +
        "&body=" + body;


    // Confirmation message

    alert("Thank you! Your email has been prepared. Please click Send in your email application.");

}