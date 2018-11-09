

function bookTemplate(book) {
  function stars(score) {
    let result = '';
    for (let i = 1; i <= 5; i += 1) {
      if (i <= score) {
        result += '<i class="fas fa-star"></i>';
      } else {
        result += '<i class="far fa-star"></i>';
      }
      result += '\n';
    }
    return result;
  }

  return `<article class="book">
    <img src="${book.photoURL}" alt="${book.title} cover">
    <h1>${book.title}</h1>
    <h2>${book.author}</h2>
    <div class="stars">
      ${stars(book.score)}
    </div>
    ${book.borrowed ? '<div class="borrow-badge"></div>' : ''}
    <section class="details">
      <div class="actions">
        <i class="fas fa-book-open open-book"></i>
        <div class="rate">
          <p>Rate this book</p>
          <div class="stars">
            ${stars(book.score)}
          </div>
        </div>
      </div>
      <div class="info">
        <div class="arrow"></div>
        <h1>${book.title}</h1>
        <span class="year">${book.year}</span>
        <p>Novel by <span class="author">${book.author}</span></p>
        <p>${book.pageCount} pages</p>
        <h2>Summary</h2>
        <p class="description">${book.description}</p>
        <h2>Rating</h2>
        <div class="stars">
          ${stars(book.score)}
        </div>
        ${book.borrowed ? '' : `<p class="borrow-button">
                Borrow this
            </p>`}
      </div>
    </section>
  </article>`;
}

export default function createBookElement(book) {
  const tempalte = document.createElement('template');
  tempalte.innerHTML = bookTemplate(book);
  return tempalte.content.firstChild;
}
