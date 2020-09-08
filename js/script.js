// Get ui element
let form = document.querySelector('#book_form');
let list = document.querySelector('#book_list');




class UI {
    static addToBookList(book) {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`
        list.appendChild(row);
    }
    static clearFIelds() {
        document.querySelector('#title').value = '',
            document.querySelector('#author').value = '',
            document.querySelector('#isbn').value = '';
    }
    static showAllert(messege, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(messege));
        let container = document.querySelector('.container');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 1000)
    }

    static deleteFormBook(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
            UI.showAllert('Successfully Book removed', 'success');
        }
    }
}



//book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//local storage class
class Store {
    static getbooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book) {
        let books = Store.getbooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static showBooks() {
        let books = Store.getbooks();
        books.forEach(book => {
            UI.addToBookList(book);
        })
    }
    static removeBook(isbn) {
        let books = Store.getbooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);

            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Add even listnear
form.addEventListener('submit', newBook);
list.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.showBooks());






function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;


    let book = new Book(title, author, isbn);


    if (title === '' || author === '' || isbn === '') {
        UI.showAllert('Please fill the empty field', 'error');
    } else {
        UI.addToBookList(book);
        UI.clearFIelds();
        UI.showAllert('Successfully Book Add', 'success');
        Store.addBook(book);
    }






    e.preventDefault();
}


//Remove Book List
function removeBook(e) {
    UI.deleteFormBook(e.target);


    e.preventDefault();
}