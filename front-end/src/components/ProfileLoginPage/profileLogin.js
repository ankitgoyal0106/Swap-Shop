document.getElementById("loginButton").addEventListener("click", function() {
    document.getElementById("popupContainer").style.display = "flex";
    document.getElementById("loginFormContainer").style.display = "block";
    document.getElementById("createAccountFormContainer").style.display = "none";
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popupContainer").style.display = "none";
});

document.getElementById("showCreateAccount").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginFormContainer").style.display = "none";
    document.getElementById("createAccountFormContainer").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("createAccountFormContainer").style.display = "none";
    document.getElementById("loginFormContainer").style.display = "block";
});

window.addEventListener("click", function(event) {
    const popup = document.getElementById("popupContainer");
    if (event.target === popup) {
        popup.style.display = "none";
    }
});

