// ==========================================
// Bella Vista Restaurant
// Booking & Feedback Form
// Muhammad Hashir Portfolio
// ==========================================

const THEME_STORAGE_KEY = "portfolio-theme";
const COOKIE_NOTICE_STORAGE_KEY = "restaurant-notice-dismissed";

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

function initializeCookieNotice() {
    const notice = document.getElementById("cookieNotice");
    const acceptButton = document.getElementById("acceptCookies");
    if (!notice || !acceptButton) return;

    notice.hidden = localStorage.getItem(COOKIE_NOTICE_STORAGE_KEY) === "accepted";
    acceptButton.addEventListener("click", () => {
        localStorage.setItem(COOKIE_NOTICE_STORAGE_KEY, "accepted");
        notice.hidden = true;
    });
}

initializeCookieNotice();

function initializeRestaurantForm() {
    const form = document.getElementById("booking-form");
    if (!form) return;

    const requestType = document.getElementById("requestType");
    const loyaltyLink = document.querySelector("[data-loyalty-link]");
    const bookingFields = form.querySelectorAll("[data-booking-field]");
    const feedbackFields = form.querySelectorAll("[data-feedback-field]");
    const bookingInputs = ["bookingDate", "bookingTime", "partySize"]
        .map((id) => document.getElementById(id));
    const rating = document.getElementById("feedbackRating");
    const phone = document.getElementById("customerPhone");

    function updateRequestFields() {
        const isBooking = requestType.value === "Table booking";
        const isFeedback = requestType.value === "Feedback";

        bookingFields.forEach((field) => {
            field.hidden = !isBooking;
        });
        feedbackFields.forEach((field) => {
            field.hidden = !isFeedback;
        });
        bookingInputs.forEach((input) => {
            input.required = isBooking;
        });
        phone.required = isBooking;
        rating.required = isFeedback;
    }

    requestType.addEventListener("change", updateRequestFields);
    if (loyaltyLink) {
        loyaltyLink.addEventListener("click", () => {
            requestType.value = "Loyalty programme";
            updateRequestFields();
        });
    }
    updateRequestFields();
    form.addEventListener("submit", generateEmail);
}

initializeRestaurantForm();

function generateEmail(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const requestType = formData.get("requestType");
    const details = [
        ["Customer name", formData.get("name")],
        ["Email address", formData.get("email")],
        ["Phone number", formData.get("phone")],
        ["Request type", requestType],
        ["Preferred date", formData.get("date")],
        ["Preferred time", formData.get("time")],
        ["Party size", formData.get("partySize")],
        ["Feedback rating", formData.get("rating")],
        ["Message", formData.get("message")]
    ].filter(([, value]) => value);

    const subject = encodeURIComponent(`${requestType} - ${formData.get("name")}`);
    const body = encodeURIComponent(details.map(([label, value]) => `${label}: ${value}`).join("\n\n"));
    window.location.href = `mailto:info@bellavista.co.uk?subject=${subject}&body=${body}`;
    alert("Your email has been prepared. Please review it and click Send in your email application.");
}