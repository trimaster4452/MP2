const username = localStorage.getItem('username');
const welcomeMsg = document.getElementById('welcome-msg');

if (username) {
  welcomeMsg.textContent = `Welcome, ${username}`;
} else {
  window.location.href = 'index.html'; // force login if no user info
}
