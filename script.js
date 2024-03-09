const main = document.getElementById("main");
const search = document.getElementById("query");
const form = document.getElementById("form");
let bookTitle = document.getElementById("book-title");
let thumbnail = document.getElementById("thumb");


function findBooks(title) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40`)
        .then(response => response.json())
        .then(data => {
            console.log(data.items[0]);
            document.getElementById("book-title").innerHTML = data.items[0].volumeInfo.title;
            thumbnail.src = data.items[0].volumeInfo.imageLinks.thumbnail;
        })
        .catch(error => console.error('Error fetching books:', error));
}

findBooks("fiction");

fetch('https://www.googleapis.com/books/v1/volumes?q=all&maxResults=40')
    .then(response => response.json())
    .then(data => {
        data.items.forEach(book => {
            const bookInfo = book.volumeInfo;
            const bookId = book.id;
            const saleInfo = book.saleInfo;

            createElements(bookInfo, bookId, saleInfo);
        });
    })
    .catch(error => console.error('Error fetching books: ', error));

function createElements(bookInfo, bookId, saleInfo) {
    const row = document.createElement('section');
    const column = document.createElement('section');
    const holder = document.createElement('section');
    const card = document.createElement('section');
    const anchor = document.createElement('a');
    const image = document.createElement('img');
    const bookTitle = document.createElement('h3');
    const moreInfoButton = document.createElement('button');

    row.className = 'row';
    column.className = 'col';
    card.className = 'card';
    holder.className = 'holder';
    image.className = 'thumbnail';
    image.id = `thumb-${bookId}`;

    if (bookInfo.imageLinks && bookInfo.imageLinks.thumbnail) {
        image.src = bookInfo.imageLinks.thumbnail;
        image.alt = bookInfo.title || 'No title available';
    }

    anchor.href = `https://www.google.com/books/edition/${bookId}`;
    bookTitle.textContent = truncateString(bookInfo.title || 'No title available', 50);
    moreInfoButton.textContent = 'More Info';

    card.appendChild(anchor);
    card.appendChild(image);
    card.appendChild(holder);
    holder.appendChild(bookTitle);
    card.appendChild(moreInfoButton);
    column.appendChild(card);
    row.appendChild(column);

    document.getElementById('main').appendChild(row);
}

function truncateString(title, num) {
    if (title.length <= num) {
        return title;
    }
    return title.slice(0, num) + '...';
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItems = search.value;

    if(searchItems){
        //findBooks(search.value);
    }
});
