// Small wrapper around localStorage, mirroring the old script.js behavior

export function getUsers() {
  return JSON.parse(localStorage.getItem("taskflowUsers")) || [];
}

export function saveUsers(users) {
  localStorage.setItem("taskflowUsers", JSON.stringify(users));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("taskflowCurrentUser"));
}

export function setCurrentUser(user) {
  localStorage.setItem("taskflowCurrentUser", JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem("taskflowCurrentUser");
}