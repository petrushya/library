
const myLibrary = [{title: 'some new book', author: 'very famous author', pages: 333, status: 'not read yet'}, {title: 'very old book', author: 'one of several authors', pages: 1111, status: 'already read'}];
const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const bookPages = document.querySelector('#bookPages');
const bookStatus = document.querySelector('#bookStatus');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const btnOpenForm = document.querySelector('.btnOpenForm');
const clozeForm = document.querySelector('.clozeForm');

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
  while(tbody.lastChild) tbody.removeChild(tbody.lastChild);
  for (let index = 0; index < array.length; index++) {
    const tableRow = document.createElement('tr');
    const cellHead = document.createElement('th');
    cellHead.setAttribute('scope', 'row');
    cellHead.textContent = index + 1;
    tableRow.appendChild(cellHead);
    for(const key in array[index]){
      if (key === 'status') {
        const cellStatus = document.createElement('td');
        cellStatus.textContent = array[index][key];
        cellStatus.className = 'status';
        cellStatus.setAttribute('tabindex', '0');
        tableRow.appendChild(cellStatus);
        cellStatus.onclick = () => {
          if(cellStatus.textContent === 'not read yet') {
            cellStatus.textContent = 'already read';
            array[index][key] = 'already read';
            cellStatus.blur();
          }else{
            cellStatus.textContent = 'not read yet';
            array[index][key] = 'not read yet';
            cellStatus.blur();
          };
        };
        cellStatus.onkeydown = (e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            if(cellStatus.textContent === 'not read yet') {
              cellStatus.textContent = 'already read';
              array[index][key] = 'already read';
              cellStatus.blur();
            } else {
              cellStatus.textContent = 'not read yet';
              array[index][key] = 'not read yet';
              cellStatus.blur();
            };
          };
        };
      } else {
        const cellTable = document.createElement('td');
        cellTable.textContent = array[index][key];
        tableRow.appendChild(cellTable);          
      };
    };
    const deletBtn = document.createElement('button');
    deletBtn.textContent = 'delete';
    deletBtn.className = 'deleteBook';
    deletBtn.setAttribute('type', 'button');
    const cellBtn = document.createElement('td');
    cellBtn.appendChild(deletBtn);
    tableRow.appendChild(cellBtn);
    tbody.appendChild(tableRow);
    deletBtn.addEventListener("click", () => {
      array.splice(index, 1);
      displayBook(array);
    });
  };
}

displayBook(myLibrary);

form.onsubmit = (e) =>{
  e.preventDefault();
  if(bookTitle.value && bookAuthor.value && bookPages.value){
    addBookToLibrary(myLibrary,bookTitle.value,bookAuthor.value,bookPages.value,bookStatus.value);
    displayBook(myLibrary);
    form.removeAttribute('class');
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
  };
};

btnOpenForm.onclick = () => {
    form.className = 'transform';
    btnOpenForm.blur();
};

clozeForm.onclick = () => {
  form.removeAttribute('class');
  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
};

window.onkeydown = (e) => {
  if(e.key === 'Escape' && form.className === 'transform') form.removeAttribute('class');
}

