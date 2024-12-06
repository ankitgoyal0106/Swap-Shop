export function saveEmailToLocalStorage(email) {
    localStorage.setItem('email', email);
}

export function getEmailFromLocalStorage() {
    return localStorage.getItem('email');
}

export function clearLocalStorage() {
    localStorage.clear();
}