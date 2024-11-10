// Fetch data from travel_recommendation_api.json
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    // Handle data from the JSON file
    let jsonData = data;

    // Search button event listener
    document.getElementById('searchButton').addEventListener('click', function (event) {
        event.preventDefault();
        let searchTerm = document.getElementById('searchInput').value.toLowerCase();
        let results = [];

        // Match the search term with the categories (beaches, temples, countries)
        if (searchTerm.includes("beach")) {
            results = jsonData.beaches.imageUrl; // Get beach results
        } else if (searchTerm.includes("temple")) {
            results = jsonData.temples.imageUrl; // Get temple results
        } else if (searchTerm.includes("country")) {
            results = jsonData.countries.imageUrl; // Get country results
        }

        // Display the results
        displayResults(results);
    });

    // Reset button event listener
    document.getElementById('resetButton').addEventListener('click', function () {
        document.getElementById('searchInput').value = '';  // Clear search input
        document.getElementById('resultsContainer').innerHTML = '';  // Clear results
    });

    // Function to display results
    function displayResults(results) {
        const resultContainer = document.getElementById('resultsContainer');
        resultContainer.innerHTML = '';  // Clear any previous results

        // Check if there are no results and display a message
        if (results.length === 0) {
            resultContainer.innerHTML = '<p>No results found. Please try again with different keywords.</p>';
            return;
        }

        // Loop through the results and display each item
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            // Image
            const image = document.createElement('img');
            image.src = item.imageUrl; // Use imageUrl from JSON
            image.alt = item.name; // Set alt text for accessibility
            resultItem.appendChild(image);

            // Name
            const name = document.createElement('h3');
            name.textContent = item.name; // Display name
            resultItem.appendChild(name);

            // Description
            const description = document.createElement('p');
            description.textContent = item.description; // Display description
            resultItem.appendChild(description);

            // Add the result item to the results container
            resultContainer.appendChild(resultItem);
        });
    }
})
.catch(error => console.error('Error fetching data:', error));