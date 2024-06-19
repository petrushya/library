
const myLibrary = [
  new Book('some new book','very famous author',333),
  new Book('very old book','one of several authors',1111)
];
const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const tbody = document.querySelector('tbody');
const btnAddBook = document.querySelector('#btnAddBook');
const btnOpenForm = document.querySelector('.btnOpenForm');
const btnClozeForm = document.querySelector('.btnClozeForm');
const btnClean = document.querySelector('.btnReset');

btnOpenForm.onclick = () => {
  form.className = 'transform';
  title.focus();
  btnOpenForm.blur();
};

form.onsubmit = (e) =>{
  e.preventDefault();
  if(title.value && author.value && pages.value){
    addBookToLibrary(title.value,author.value,pages.value);
    displayBook();
    form.removeAttribute('class');
    title.value = '';
    author.value = '';
    pages.value = '';
  }else{
    btnAddBook.blur();
  };
};

btnClean.onclick = () => {
  title.focus();
  btnClean.blur();
};

btnClozeForm.onclick = () => {
  form.removeAttribute('class');
  title.value = '';
  author.value = '';
  pages.value = '';
};

window.onkeydown = (e) => {
  if(e.key === 'Escape' && form.className === 'transform') form.removeAttribute('class');
}

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
    btnDelet.className = 'deleteBook';
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
}

function addBookToLibrary(title,author,pages){
  myLibrary.push(new Book(title,author,pages));
}

function displayBook(){
  while(tbody.firstChild) tbody.removeChild(tbody.firstChild);
  for (let index = 0; index < myLibrary.length; index++) {
    const tableRow = document.createElement('tr');
    const cellHead = document.createElement('th');
    cellHead.setAttribute('scope', 'row');
    cellHead.textContent = index + 1;
    tableRow.appendChild(cellHead);
    myLibrary[index].forEach(item => {
      const tableCell = document.createElement('td');
      tableCell.appendChild(item);
      tableRow.appendChild(tableCell);
    });
    tbody.appendChild(tableRow);
  };
  const btnDelet = document.querySelectorAll('.deleteBook');
  btnDelet.forEach((button, index) => {
    button.dataset.check = index;
    button.onclick = () => {
      myLibrary.splice(+button.dataset.check, 1);
      displayBook();
    };
  });
}

displayBook();