const books = [
  ["some new book", "very famous author", "333"],
  ["very old book", "one of several authors", "1111"],
];

const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const status = document.querySelector("#status");
const tbody = document.querySelector("tbody");
const btnAddBook = document.querySelector("#btnAddBook");
const btnOpenForm = document.querySelector("#btnOpenForm");
const btnClozeForm = document.querySelector("#btnClozeForm");
const btnClean = document.querySelector("#btnReset");

class Book {
  constructor([title, author, pages, status = null]) {
    this.bookInfo = [(this.title = title), (this.author = author), (this.pages = pages), (this.status = status)];
  }

  tableRaw() {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    tr.append(th);
    this.bookInfo.map((item, index) => {
      const td = document.createElement("td");
      if (index < 3) {
        td.textContent = item;
        tr.append(td);
      } else {
        td.textContent = this.status === null ? "not read yet" : "alreade read";
        const btnStatus = document.createElement("button");
        btnStatus.innerHTML = this.status === null ? "&#x203B;" : "&#x2714;";
        btnStatus.type = "button";
        btnStatus.className = "drop";
        btnStatus.name = "change status";
        if (this.status === null) btnStatus.title = "change status";
        if (this.status !== null) btnStatus.setAttribute("disabled", "");
        td.append(btnStatus);
        tr.append(td);
      }
    });
    const td = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "delete";
    btnDelete.type = "button";
    btnDelete.name = "delete book";
    btnDelete.title = "delete book";
    td.append(btnDelete);
    tr.append(td);
    return tr;
  }
}

function displayAsTable() {
  tbody.textContent = "";
  for (let index = 0; index < books.length; index++) {
    const line = new Book(books[index]).tableRaw();
    line.firstChild.textContent = `${index + 1}`;
    line.children[4].lastChild.onclick = () => {
      if (window.confirm('Do you want to permanently change the status to "already read"?')) books[index].push("1");
      displayAsTable();
    };
    line.lastChild.lastChild.onclick = () => {
      if (window.confirm("Do you want to delete this book?")) books.splice(index, 1);
      displayAsTable();
    };
    tbody.append(line);
  }
}

displayAsTable();

btnOpenForm.onclick = () => {
  form.className = "transform";
  btnOpenForm.blur();
  title.focus();
};

form.onsubmit = (e) => {
  e.preventDefault();
  if (title.value && author.value && pages.value) {
    books.push([title.value, author.value, pages.value]);
    displayAsTable();
    form.removeAttribute("class");
    title.value = "";
    author.value = "";
    pages.value = "";
  } else {
    btnAddBook.blur();
  }
};

btnClean.onclick = () => {
  title.focus();
  btnClean.blur();
};

btnClozeForm.onclick = () => {
  form.removeAttribute("class");
  title.value = "";
  author.value = "";
  pages.value = "";
};

window.onkeydown = (e) => {
  if (e.key === "Escape" && form.className === "transform") {
    form.removeAttribute("class");
    title.value = "";
    author.value = "";
    pages.value = "";
  }
};
