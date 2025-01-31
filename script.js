const accessKey = '3duPPrwKl7jGgcv2RPMspj_Q-f6FEYQ4kGm32A4HUiM';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadmoreBtn = document.querySelector('.loadmoreBtn')

let page = 1; // Page number for paginated results

// Function to fetch images from Unsplash API
const fetchImages = async (query, pageNo) => {
    if(pageNo === 1){
        imagesContainer.innerHTML = ''; // Clear existing images

    }
    
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();

        if (data.results.length === 0) {
            imagesContainer.innerHTML = '<h1>No results found. Try a different search term.</h1>';
            return;
        }

        // Loop through each image result
        data.results.forEach((photo) => {
            // Create the image div
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}" />`;

            // Create an overlay
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');

            // Create overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = photo.alt_description || 'No description available';

            overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);
            imagesContainer.appendChild(imageElement);

            loadmoreBtn.style.display = 'block';  // Show load more button if images are found
        });
    } catch (error) {
        console.error(error);
        imagesContainer.innerHTML = '<h1>Something went wrong. Please try again later.</h1>';
        loadmoreBtn.style.display = 'none'; // Hide load more button
    }
};

// Add Event Listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Avoid page refresh
    const inputText = searchInput.value.trim(); // Remove extra spaces
    if (inputText !== '') {
         page = 1;  // Reset page number to 1 for a new search
        fetchImages(inputText, page);
    } else {
        imagesContainer.innerHTML = '<h1>Please enter a search query.</h1>';
        loadmoreBtn.style.display = 'none';  // Hide load more button
    }
});

// Add Event Listener to load more button to fetch more images

loadmoreBtn.addEventListener('click', () => {
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
    fetchImages(inputText, ++page);  // Increment the page and fetch more images
}
});