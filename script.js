//https://api.tvmaze.com/search/shows?q=${query}

const form = document.querySelector('form');
const container = document.querySelector('.image-container');
const paginationContainer = document.querySelector('.pagination-container'); 

let movies = [];
let currentPage = 1;
const resultsPerPage = 6;

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = form.querySelector('input').value;

    endPointApi(query);
});

// Fetch movies from API
async function endPointApi(query) {
    const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    movies = await req.json();

    currentPage = 1; // Reset to the first page
    renderPage();
}

// Render images for the current page
function renderPage() {
    container.innerHTML = ''; // Clear existing content

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentMovies = movies.slice(startIndex, endIndex);

    for (let movie of currentMovies) {
        if (movie.show.image) { // Check if image exists
            const src = movie.show.image.medium;
            const img = document.createElement('img');
            img.src = src;

            container.appendChild(img);
        }
    }

    renderPagination();
}

// Render pagination controls
function renderPagination() {
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(movies.length / resultsPerPage);

    // Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderPage();
        });
        paginationContainer.appendChild(prevButton);
    }

    // Next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentPage++;
            renderPage();
        });
        paginationContainer.appendChild(nextButton);
    }
}
