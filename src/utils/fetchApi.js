import axios from 'axios';
const catBreedApi = () => {
  const apiKey = 'live_pnTFg3HR1QYiGpxeXvKrFN3CvIDPYiFx6gbqptFqXRgoPvlxhulfK0thw3797rIJ';
const SearchInput = document.querySelector('#SearchInput');
const btnSearch = document.querySelector('#searchButton');
const catContainer = document.querySelector('.cat-container');
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
  const breed = SearchInput.value.trim();
  if(breed){
    fetchCats(breed)
    SearchInput.value = '';
  }else{
    catContainer.innerHTML = `<p>Please enter a breed. </p>`
  }
});
}
export default catBreedApi;