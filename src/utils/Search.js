import axios from 'axios';

const catBreedApi = () => {
  const apiKey = 'live_pnTFg3HR1QYiGpxeXvKrFN3CvIDPYiFx6gbqptFqXRgoPvlxhulfK0thw3797rIJ';

  // DOM elements
  const SearchInput = document.querySelector('#SearchInput');
  const btnSearch = document.querySelector('#searchButton');
  const catContainer = document.querySelector('.cat-container');
  const gallerySection = document.querySelector('#gallery');
  const refreshButton = document.querySelector('#refreshButton');
  const catModal = document.querySelector('#catModal');
  const catModalImage = document.querySelector('#catModalImage');
  const catModalInfo = document.querySelector('#catModalInfo');
  const closeModal = document.querySelector('.close-modal');
  const searchDiv = document.querySelector('#searched');

  // Utility function to safely encode JSON
  const safeEncode = (obj) => {
    try {
      return encodeURIComponent(JSON.stringify(obj)); // Simple JSON encoding
    } catch (error) {
      console.error("Error encoding JSON:", error, obj);
      return "";
    }
  };
  
  

// Utility function to safely decode JSON
const safeDecode = (str) => {
  try {
    return JSON.parse(decodeURIComponent(str));
  } catch (error) {
    console.error("Failed to decode JSON:", error, "Input string:", str);
    return null; // Return null for invalid JSON
  }
};



const createCatCard = (cat) => {
  const breedName = cat.breeds?.[0]?.name || 'Unknown Breed';
  const catData = {
    url: cat.url,
    breeds: cat.breeds || [],
  };
  return `
    <div class="cat-card" data-info="${safeEncode(catData)}">
      <img src="${cat.url}" alt="${breedName}">
      <p>${breedName}</p>
    </div>`;
};

  const showModal = (catData) => {
    console.log("Decoded Cat Data:", catData);
    const breedInfo = catData.breeds?.[0] || {};
    catModalImage.src = catData.url;
    catModalInfo.innerHTML = `
      <h2>${breedInfo.name || 'Unknown Breed'}</h2>
      <p><strong>Description:</strong> ${breedInfo.description || 'No description available.'}</p>
      <p><strong>Origin:</strong> ${breedInfo.origin || 'Unknown'}</p>
      <p><strong>Temperament:</strong> ${breedInfo.temperament || 'Unknown'}</p>
      <p><strong>Life Span:</strong> ${breedInfo.life_span || 'Unknown'} years</p>
    `;
    catModal.style.display = 'block';
  };

  const fetchRandomCats = async () => {
    try {
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?limit=9&has_breeds=1',
        { headers: { 'x-api-key': apiKey } }
      );

      catContainer.innerHTML = response.data
        .map((cat) => createCatCard(cat))
        .join('');

      document.querySelectorAll('.cat-card').forEach((card) => {
        card.addEventListener('click', () => {
          const catData = safeDecode(card.getAttribute('data-info'));
          if (catData) {
            showModal(catData);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching random cats:', error);
      catContainer.innerHTML = '<p>Error fetching random cats. Try again later.</p>';
    }
  };

  const fetchCatsByBreed = async (breed) => {
    try {
      const breedResponse = await axios.get('https://api.thecatapi.com/v1/breeds', {
        headers: { 'x-api-key': apiKey },
      });

      const selectedBreed = breedResponse.data.find((b) => b.name.toLowerCase() === breed.toLowerCase());

      if (!selectedBreed) {
        catContainer.innerHTML = '<p>No breed found. Try again!</p>';
        return;
      }

      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed.id}&limit=9`,
        { headers: { 'x-api-key': apiKey } }
      );

      catContainer.innerHTML = response.data
        .map((cat) => `<img src="${cat.url}" alt="A cat" />`)
        .join('');
    } catch (error) {
      console.error('Error fetching cat data:', error);
      catContainer.innerHTML = '<p>Error fetching cat data. Try again later.</p>';
    }
  };

  btnSearch.addEventListener('click', () => {
    const breed = SearchInput.value.trim();
    gallerySection.scrollIntoView({ behavior: 'smooth' });

    if (breed) {
      fetchCatsByBreed(breed);
      searchDiv.innerHTML = `<h2>Images of "${breed.toUpperCase()}"</h2>`;
      SearchInput.value = '';
    } else {
      catContainer.innerHTML = '<p>Please enter a Breed.</p>';
    }
  });

  refreshButton.addEventListener('click', () => {
    searchDiv.innerHTML = '';
    catContainer.innerHTML = '';
    fetchRandomCats();
  });

  closeModal.addEventListener('click', () => {
    catModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === catModal) {
      catModal.style.display = 'none';
    }
  });

  fetchRandomCats();
};

export default catBreedApi;
