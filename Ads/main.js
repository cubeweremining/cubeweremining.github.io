const icon = document.getElementById('icon')

function isVisible() {
    const icon = document.getElementById('icon');
    if (document.visibilityState === "visible") {
        icon.href = "favicon.png";
    } else {
        icon.href = "favicon2.png";
    }
}

isVisible();

document.addEventListener("visibilitychange", isVisible);

