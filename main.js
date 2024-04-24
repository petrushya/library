
const myLibrary = [{title: 'some new book', author: 'very famous author', pages: 333, status: 'not read yet'}];
const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const bookPages = document.querySelector('#bookPages');
const bookStatus = document.querySelector('#bookStatus');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const btnOpenForm = document.querySelector('.btnOpenForm');

function Book(title,author,pages,status){
  this.title=title;
  this.author=author;
  this.pages=pages;
  this.status=status;
}

function addBookToLibrary(array,title,author,pages,status){
  return array.push(new Book(title,author,pages,status));
}

function displayBook(array){
  for (let index = 0; index < array.length; index++) {
    const tableRow = document.createElement('tr');
    const cellHead = document.createElement('th');
    cellHead.setAttribute('scope', 'row');
    cellHead.textContent = index + 1;
    tableRow.appendChild(cellHead);
    for(const key in array[index]){
      const cellTable = document.createElement('td');
      cellTable.textContent = array[index][key];
      tableRow.appendChild(cellTable);
    };
    const deletBtn = document.createElement('button');
    deletBtn.textContent = 'delete';
    deletBtn.className = 'deleteBook';
    deletBtn.setAttribute('type', 'button');
    const cellBtn = document.createElement('td');
    cellBtn.appendChild(deletBtn);
    tableRow.appendChild(cellBtn);
    tbody.appendChild(tableRow);
  };
}

displayBook(myLibrary);


