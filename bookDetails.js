const buyBtn = document.getElementById('buy-btn');
const previewBtn = document.getElementById('preview-btn');

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    if (bookId) {
        fetchBookDetails(bookId);
    } else {
        console.error('Book ID not found in URL');
    }
});

function fetchBookDetails(bookId) {
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            document.getElementById('book-title').innerHTML = data.volumeInfo.title;
           
            if(data.volumeInfo.description){
                document.getElementById('description').innerHTML = data.volumeInfo.description;

                document.getElementById('description').innerHTML = truncateString(data.volumeInfo.description.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ') || 'No description available', 1200);

            } else{
                document.getElementById('description').innerHTML = "No Description";
            }
            if(data.saleInfo.saleability === "FOR_SALE"){
                document.getElementById('price').innerHTML =data.saleInfo.listPrice.currencyCode +" "+ data.saleInfo.listPrice.amount;
                console.log(data.saleInfo.buyLink);
                toBuy(data.saleInfo.buyLink);
            } else{
                document.getElementById('price').innerHTML = "ZAR " + 0.00;
            }
            if(data.volumeInfo.industryIdentifiers){
                data.volumeInfo.industryIdentifiers.forEach(isbn => {
                document.getElementById('isbn').innerHTML = `ISBN: ${isbn.identifier}`;
                });
            } else{
                document.getElementById('isbn').innerHTML = "ISBN: N/A";
            }

            if(data.volumeInfo.authors){
                const authors = data.volumeInfo.authors;
                let authorsText = "Authors: ";
                for(let i = 0; i < authors.length; i++){
                    authorsText += authors[i];
                    if (i < authors.length - 1) {
                        authorsText += ", ";
                    }
                }
            document.getElementById('author').innerHTML = authorsText;
            } else{
                document.getElementById('author').innerHTML = "Authors: N/A";
            }
            
            
            if(data.volumeInfo.imageLinks){
                document.getElementById('thumbnail').src = data.volumeInfo.imageLinks.thumbnail;
            }else {
                document.getElementById('thumbnail').src = "http://goo.gl/vyAs27";
            }
            
            
        })
        .catch(error => console.error("error fetching book: ", error))
}

function truncateString(title, num) {
    if (title.length <= num) {
        return title;
    }
    return title.slice(0, num) + '...';
}


function toBuy(url){
    window.open('url', '_blank')
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItems = search.value;

    if(searchItems){
        findBooks(search.value);
    }
});