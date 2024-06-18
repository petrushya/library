
const myLibrary = [
  {title: 'some new book', author: 'very famous author', pages: 333, status: status(), deletBtn: deletBtn()},
  {title: 'very old book', author: 'one of several authors', pages: 1111, status: status(), deletBtn: deletBtn()}
];
const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const bookPages = document.querySelector('#bookPages');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const btnOpenForm = document.querySelector('.btnOpenForm');
const btnClozeForm = document.querySelector('.btnClozeForm');
const btnClear = document.querySelector('.btnReset');

btnOpenForm.onclick = () => {
  form.className = 'transform';
  btnOpenForm.blur();
};

form.onsubmit = (e) =>{
  e.preventDefault();
  if(bookTitle.value && bookAuthor.value && bookPages.value){
    addBookToLibrary(myLibrary,bookTitle.value,bookAuthor.value,bookPages.value);
    displayBook(myLibrary);
    form.removeAttribute('class');
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
  };
};

btnClear.onclick = () => {
  btnClear.blur();
};

btnClozeForm.onclick = () => {
  form.removeAttribute('class');
  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
};

window.onkeydown = (e) => {
  if(e.key === 'Escape' && form.className === 'transform') form.removeAttribute('class');
}

function Book(title,author,pages){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status();
  this.deletBtn = deletBtn();
}

function addBookToLibrary(array,title,author,pages){
  return array.push(new Book(title,author,pages));
}

function status(){
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
}

function deletBtn(){
  const deletBtn = document.createElement('button');
  deletBtn.textContent = 'delete';
  deletBtn.className = 'deleteBook';
  deletBtn.setAttribute('type', 'button');
  return deletBtn;
}

function displayBook(array){
  while(tbody.firstChild) tbody.removeChild(tbody.firstChild);
  for (let index = 0; index < array.length; index++) {
    const tableRow = document.createElement('tr');
    const cellHead = document.createElement('th');
    cellHead.setAttribute('scope', 'row');
    cellHead.textContent = index + 1;
    tableRow.appendChild(cellHead);
    for(const key in array[index]){
      const cellTable = document.createElement('td');
      if(typeof array[index][key] !== 'object'){
        cellTable.textContent = array[index][key];
      }else{
        cellTable.appendChild(array[index][key]);
      };
      tableRow.appendChild(cellTable);
    };
    tbody.appendChild(tableRow);
  };
  const deletBtn = document.querySelectorAll('.deleteBook');
  deletBtn.forEach((button, index) => {
    button.dataset.check = index;
    button.onclick = () => {
      array.splice(+button.dataset.check, 1);
      displayBook(array);
    };
  });
}

displayBook(myLibrary);