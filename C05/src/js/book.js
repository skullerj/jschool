

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
    <section class="details">
      <div class="actions">
        <div class="top">
          <i class="far fa-heart"></i>
          <i class="far fa-bookmark"></i>
        </div>
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
        <p>${book.description}</p>
        <h2>Rating</h2>
        <div class="stars">
          ${stars(book.score)}
        </div>
        <h2>Recommended by</h2>
        <div class="recommenders">
          <img src="src/images/avatar2.png" alt="John Doe Avatar Picture">
          <img src="src/images/avatar3.png" alt="John Doe Avatar Picture">
          <img src="src/images/avatar4.png" alt="John Doe Avatar Picture">
        </div>
      </div>
    </section>
  </article>`;
}

export default function createBookElement(book) {
  const tempalte = document.createElement('template');
  tempalte.innerHTML = bookTemplate(book);
  return tempalte.content.firstChild;
}
