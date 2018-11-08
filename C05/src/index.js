import './scss/styles.scss';
import './favicon.ico';
import './images/logo.png';
import './images/avatar.png';
// Import Aribnb shims to enable fetch and classList APIs
import 'airbnb-browser-shims';
import Bookshelf from './js/bookshelf';

window.addEventListener('DOMContentLoaded', () => {
  const booksContainer = document.querySelector('section.books');
  const loadingElement = document.querySelector('.loading');
  const burgerMenu = document.querySelector('#burgerMenu');
  const drawer = document.querySelector('#drawer');
  const drawerBackground = document.querySelector('.drawer-background');
  const bookshelf = new Bookshelf(booksContainer, loadingElement);

  bookshelf.loadBooks('books.json');

  function toggleDrawer() {
    if (drawer.classList.contains('opened')) {
      drawer.classList.remove('opened');
    } else {
      drawer.classList.add('opened');
    }
  }

  burgerMenu.addEventListener('click', () => {
    toggleDrawer();
  });

  drawerBackground.addEventListener('click', () => {
    toggleDrawer();
  });
});
