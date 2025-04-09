import renderHome from './home.js';
import renderLogin from './login.js';
import renderRegister from './register.js';

const routes = {
  '#/': renderHome,
  '#/login': renderLogin,
  '#/register': renderRegister
};

function router() {
  const container = document.getElementById('app');
  const hash = window.location.hash || '#/';
  const render = routes[hash];
  if (render) {
    render(container);
  } else {
    container.innerHTML = '<h2>404 Page Not Found</h2>';
  }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
