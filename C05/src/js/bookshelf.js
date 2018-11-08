import createBookElement from './book';
/*
* Bookshelf class maintains in sync a JSON collection of books
* with the html insite it's booksContainer.
* It also toggles a `showing` class on it's loadingElement
* according to it's loading attribute.
*
 */

export default class Bookshelf {
  constructor(booksContainer, loadingElement) {
    this.booksContainer = booksContainer;
    this.loadingElement = loadingElement;
    this.loading = false;
    this.bookElements = [];
    this.books = [];   
    this.openedBook = null;
    this.lastError = null;
  }

  async loadBooks(booksUrl) {
    this.loading = true;
    try {
      const response = await fetch(booksUrl);
      this.books = await response.json();
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.lastError = err;
    }
  }

  set loading(value) {
    this.updateLoading(value);
    return value;
  }

  set books(value) {
    this.udpateBooks(value);
    return value;
  }

  toggleBookDetails(book) {
    if (book === this.openedBook) {
      book.classList.remove('opened');
      this.openedBook = null;
    } else {
      if (this.openedBook) {
        this.openedBook.classList.remove('opened');
      }
      book.classList.add('opened');
      this.openedBook = book;
    }
  }

  closeBookDetails() {
    this.openedBook.classList.remove('opened');
    this.openedBook = null;
  }

  udpateBooks(books) {
    // Remove all the books
    while (this.bookElements.length > 0) {
      this.booksContainer.removeChild(this.bookElements.pop());
    }
    // Re insert all the books
    books.forEach((book) => {
      const bookElement = createBookElement(book);
      if (window.innerWidth >= 992) {
        bookElement.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleBookDetails(bookElement);
        });
      }

      this.bookElements.push(bookElement);
      this.booksContainer.appendChild(bookElement);
    });
  }

  updateLoading(loading) {
    if (loading) {
      this.loadingElement.classList.add('showing');
    } else {
      this.loadingElement.classList.remove('showing');
    }
  }
}
