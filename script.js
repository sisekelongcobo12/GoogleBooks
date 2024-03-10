const main = document.getElementById("main");
const search = document.getElementById("query");
const form = document.getElementById("form");
let bookTitle = document.getElementById("book-title");
let thumbnail = document.getElementById("thumb");



function findBooks(title) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(book => {
                const bookInfo = book.volumeInfo;
                const bookId = book.id;
                const saleInfo = book.saleInfo;
    
                createElements(bookInfo, bookId, saleInfo);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
}

function getRandomItem() {
    const categories = ["Fiction" ,"Mystery" ,"Science" ,"Fiction", "Romance", "Thriller", "Biography", "fantasy", "Horror", "Historical Fiction", "Adventure", 
    "Graphic Novel", "Young Adult", "Short Story", "LGBTQ", "Drama", "Fairy Tale", "Classic", "Contemporary", "Cookbooks", "Satire"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

const randomCategory = getRandomItem();
fetch(`https://www.googleapis.com/books/v1/volumes?q=${randomCategory}&maxResults=40`)
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
    moreInfoButton.className = 'bnt'
    image.id = `thumb-${bookId}`;

    if (bookInfo.imageLinks && bookInfo.imageLinks.thumbnail) {
        image.src = bookInfo.imageLinks.thumbnail;
        image.alt = bookInfo.title || 'No title available';
    }

    //anchor.href = `https://www.google.com/books/edition/${bookId}`;
    bookTitle.textContent = truncateString(bookInfo.title || 'No title available', 40);
    moreInfoButton.textContent = 'More Info';

    card.appendChild(anchor);
    card.appendChild(image);
    card.appendChild(holder);
    holder.appendChild(bookTitle);
    card.appendChild(moreInfoButton);
    column.appendChild(card);
    row.appendChild(column);

    document.getElementById('main').appendChild(row);

    moreInfoButton.textContent = 'More Info';
    moreInfoButton.addEventListener('click', function () {
        redirectToDetailsPage(bookId);
    });
}

function redirectToDetailsPage(bookId) {
    const detailsPageURL = `bookDetails.html?id=${bookId}`;
    window.location.href = detailsPageURL;
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
        findBooks(search.value);
    }
});


// function handleResponse(response) {
//     for (var i = 0; i < response.items.length; i++) {
//       var item = response.items[i];
//       // in production code, item.text should have the HTML entities escaped.
//       document.getElementById("main").innerHTML += "<br>" + item.volumeInfo.title;
//     }
//   }


// function searchBooks(title, callback) {
//     // Replace 'your_api_key' with your actual API key
//     const apiKey = 'AIzaSyBErWJiFozsG9xDIqBAjOY_nShF0Ol1868';
//     const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=title:${title}&key=${apiKey}&callback=${callback}`;

//     // Create a script element to make the JSONP request
//     const script = document.createElement('script');
//     script.src = apiUrl;

//     // Append the script to the document to trigger the request
//     document.head.appendChild(script);
// }

// // Define a callback function to handle the API response
// function handleBooksResponse(data) {
//     // Accessing information from the response
//     data.items.forEach(item => {
//         const volumeInfo = item.volumeInfo;
//         const title = volumeInfo.title || 'N/A';
//         const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A';
//         const summary = volumeInfo.description || 'N/A';
//         const coverImageURL = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'N/A';

//         const cardSection = document.createElement('section');
//         cardSection.setAttribute('class', 'card');

//         const rowSection = document.createElement('section');
//         rowSection.setAttribute('class', 'row');
        
//         const colSection = document.createElement('section');
//         colSection.setAttribute('class', 'col');
        
//         const centerSection = document.createElement('section');
//         centerSection.setAttribute('class', 'card');
        
//         const img = document.createElement('img');
//         img.setAttribute('class', 'thumbnail');
        
//         const bookTitle = document.createElement('h3');
//         bookTitle.setAttribute('id', 'title');
        
//         const author = document.createElement('h3');
//         author.setAttribute('id', 'author');
        
//         const saleability = document.createElement('h3');
//         saleability.setAttribute('id', 'sale');

//         img.src = coverImageURL;
//         bookTitle.innerHTML = `${title}`;
//         author.innerHTML = `${authors}`;

//         centerSection.appendChild(img);
//         cardSection.appendChild(centerSection);
//         cardSection.appendChild(author);
//         cardSection.appendChild(bookTitle);
//         colSection.appendChild(cardSection);
//         rowSection.appendChild(colSection);

//         main.appendChild(rowSection);




//         // Now you can use these variables in your application
//         console.log(`Title: ${title}`);
//         console.log(`Authors: ${authors}`);
//         console.log(`Summary: ${summary}`);
//         console.log(`Cover Image URL: ${coverImageURL}`);
//         console.log('\n');
//     });
// }




// // Make the Books API request with the search term and callback function
// //searchBooks(search, 'handleBooksResponse');



// // api key= AIzaSyBErWJiFozsG9xDIqBAjOY_nShF0Ol1868