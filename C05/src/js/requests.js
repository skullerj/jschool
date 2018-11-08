export default function getBooks() {
  const url = 'books.json';
  return fetch(url);
}
