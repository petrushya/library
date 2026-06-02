const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const tbody = document.querySelector('tbody');
const btnAddBook = document.querySelector('#btnAddBook');
const btnOpenForm = document.querySelector('.btnOpenForm');
const btnClozeForm = document.querySelector('.btnClozeForm');
const btnClean = document.querySelector('.btnReset');

class Book {
  constructor(title, author, pages) {
    this.bookInfo =
      [this.title = title, this.author = author, this.pages = pages];
  }
  #status() {
    const select = document.createElement('select');
    const optionOne = document.createElement('option');
    const optionTwo = document.createElement('option');
    optionOne.textContent = 'not read yet';
    optionOne.setAttribute('name', 'not');
    optionOne.setAttribute('selected', '');
    select.appendChild(optionOne);
    optionTwo.textContent = 'alreade read';
    optionTwo.setAttribute('name', 'yes');
    select.appendChild(optionTwo);
    select.onchange = () => {
      optionOne.setAttribute('disabled', '');
      select.blur();
    };
    return select;
  }
  #btnDelet() {
    const button = document.createElement('button');
    button.textContent = 'delete';
    button.type = 'button';
    button.className = 'deleteBook';
    return button;
  }
  bookData() {
    const arr = [];
    this.bookInfo.forEach(item => {
      const p = document.createElement('p');
      p.textContent = item;
      arr.push(p);
    });
    arr.push(this.#status(), this.#btnDelet());
    return arr;
  }
}

const myLibrary = [
  new Book('some new book', 'very famous author', 333).bookData(),
  new Book('very old book', 'one of several authors', 1111).bookData(),
];

btnOpenForm.onclick = () => {
  form.className = 'transform';
  btnOpenForm.blur();
  title.focus();
}

form.onsubmit = (e) => {
  e.preventDefault();
  if (title.value && author.value && pages.value) {
    addBookToLibrary(title.value, author.value, pages.value);
    displayBook();
    form.removeAttribute('class');
    title.value = '';
    author.value = '';
    pages.value = '';
  } else {
    btnAddBook.blur();
  }
}

btnClean.onclick = () => {
  title.focus();
  btnClean.blur();
}

btnClozeForm.onclick = () => {
  form.removeAttribute('class');
  title.value = '';
  author.value = '';
  pages.value = '';
}

window.onkeydown = (e) => {
  if (e.key === 'Escape' && form.className === 'transform') {
    form.removeAttribute('class');
    title.value = '';
    author.value = '';
    pages.value = '';
  }
}

<<<<<<< HEAD
function Book(title,author,pages){
  this.bookInfo = [title, author, pages];
  this.status = function(){
    const select = document.createElement('select');
    select.setAttribute('name', 'choice');
    const optionOne = document.createElement('option');
    optionOne.setAttribute('value', 'not');
    optionOne.setAttribute('selected', '');
    optionOne.textContent='not read yet';
    select.appendChild(optionOne);
    const optionTwo = document.createElement('option');
    optionTwo.setAttribute('value', 'yes');
    optionTwo.textContent='already read';
    select.appendChild(optionTwo);
    select.onchange = (e) => {
      if(e.target.value === optionTwo.value) optionOne.setAttribute('disabled', '');
      select.blur();
    };
    return select;
  };
  this.btnDelet = function(){
    const btnDelet = document.createElement('button');
    btnDelet.textContent = 'delete';
    btnDelet.setAttribute('type', 'button');
    return btnDelet;
  };
  this.bookData = function(){
    const arr = [];
    this.bookInfo.forEach(item => {
      const para = document.createElement('p');
      para.textContent = item;
      arr.push(para);
    });
    arr.push(this.status(), this.btnDelet());
    return arr;
  };
  return this.bookData();
=======
function addBookToLibrary(title,author,pages) {
  myLibrary.push(new Book(title,author,pages).bookData());
>>>>>>> 50d2d22a18397f2246445d800d93388da33d5430
}

function displayBook() {
  tbody.textContent = '';
  for (let index = 0; index < myLibrary.length; index++) {
    const tableRow = document.createElement('tr');
    const cellHead = document.createElement('th');
    cellHead.scope = 'row';
    cellHead.textContent = index + 1;
    tableRow.appendChild(cellHead);
    myLibrary[index].forEach(item => {
      const tableCell = document.createElement('td');
      tableCell.appendChild(item);
      tableRow.appendChild(tableCell);
      if(item.tagName.toLowerCase() === 'button') {
        item.onclick = () => {
          myLibrary.splice(index, 1);
          displayBook();
        };
      }
    });
    tbody.appendChild(tableRow);
  };
}

displayBook();