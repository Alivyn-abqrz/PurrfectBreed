import axios from 'axios';
const catBreedApi = () => {
  const apiKey = 'live_pnTFg3HR1QYiGpxeXvKrFN3CvIDPYiFx6gbqptFqXRgoPvlxhulfK0thw3797rIJ';
const SearchInput = document.querySelector('#SearchInput');
const btnSearch = document.querySelector('#searchButton');
const catContainer = document.querySelector('.cat-container');
const gallerySection = document.querySelector('#gallery')
const refreshButton = document.querySelector('#refreshButton');
const catModal = document.querySelector('#catModal');
const catModalImage = document.querySelector('#catModalImage');
const catModalInfo = document.querySelector('#catModalInfo');
const closeModal = document.querySelector('.close-modal');
const searchDiv = document.querySelector('#searched');
// Fetch random cat images with breed names
const fetchRandomCats = async () => {
  try {
    const response = await axios.get(
      'https://api.thecatapi.com/v1/images/search?limit=9&has_breeds=1',
      { headers: { 'x-api-key': apiKey } }
    );
    console.log('Fetched Random Cats:', response.data); // Debugging log
    const catImages = response.data;

    // Display random images with breed names
    catContainer.innerHTML = catImages
    .map((cat) => {
      const breedName = cat.breeds[0]?.name || 'Unknown Breed';
      return `
        <div class="cat-card" data-info='${JSON.stringify(cat)}'>
          <img src="${cat.url}" alt="${breedName}">
          <p>${breedName}</p>
        </div>`;
    })
    .join('');
      // add click event to each cat card
      document.querySelectorAll('.cat-card').forEach((card) =>{
        card.addEventListener('click', () => {
          const catData = JSON.parse(card.getAttribute('data-info'));
          showModal(catData);
        });
      });
  } catch (error) {
    console.error('Error fetching random cats:', error);
    catContainer.innerHTML = '<p>Error fetching random cats. Try again later.</p>';
  }
};
  // show modal with cat details
  const showModal = (catData) => {
    const breedInfo = catData.breeds[0] || {};
    catModalImage.src = catData.url;
    catModalInfo.innerHTML =`
     <h2>${breedInfo.name || 'Unknown Breed'}</h2>
    <p><strong>Description:</strong> ${breedInfo.description || 'No description available.'}</p>
    <p><strong>Origin:</strong> ${breedInfo.origin || 'Unknown'}</p>
    <p><strong>Temperament:</strong> ${breedInfo.temperament || 'Unknown'}</p>
    <p><strong>Life Span:</strong> ${breedInfo.life_span || 'Unknown'} years</p>
    `;
    catModal.style.display = 'block';
  };
  // close modal
  closeModal.addEventListener('click', () =>{
    catModal.style.display = 'none';
  })
  // close modal when clicking outside content
  window.addEventListener('click', (event) => {
    if(event.target === catModal){
      catModal.style.display = 'none'
    }
  });
 // Fetch breed data
const fetchCats = async (breed) =>{
  try{
    const Breedresponse = await axios.get(
      'https://api.thecatapi.com/v1/breeds',
      {headers:{'x-api-key':apiKey}}
    );
    const breeds = Breedresponse.data;
    const selectedBreed = breeds.find((b) => b.name.toLowerCase() === breed.toLowerCase());
    console.log(Breedresponse.data)
    if(!selectedBreed){
      console.log('Axios:', axios);
      catContainer.innerHTML=`<p> No breed found. Try again ! </p>`;
      return;
    }
    
    // Fetch images for the selected breed
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed.id}&limit=9`,
      {headers:{'x-api-key': apiKey}}

    );
    const catImages = response.data;
    //Display Images
    catContainer.innerHTML = catImages
    .map((cat) => 
      `<img src="${cat.url}" alt="A cat" />`)
    .join('');
  }catch(error){
    console.error(`Error fetching cat data:`, error)
    catContainer.innerHTML = `<p>Error fetching cat data. Try again later. </p>`
  }
};
btnSearch.addEventListener('click', () => {
  const searchText = document.createElement('h2')
  const breed = SearchInput.value.trim();
  gallerySection.scrollIntoView({behavior:'smooth'})
  if(breed){
    fetchCats(breed);
    searchText.textContent = `Images of "${SearchInput.value.toUpperCase()}"`
    searchDiv.innerHTML = ''; // Clear previous search
    searchDiv.appendChild(searchText)
    SearchInput.value = '';
  }else{
    catContainer.innerHTML = `<p>Please enter a Breed. </p>`
  }
});
refreshButton.addEventListener('click', () => {
  searchDiv.innerHTML = ''; // Clear previous search
  fetchRandomCats();
})
fetchRandomCats();
}
export default catBreedApi;