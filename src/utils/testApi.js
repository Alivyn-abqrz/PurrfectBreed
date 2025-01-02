import axios from 'axios';
const TestApi = () => {

  axios.get('https://api.thecatapi.com/v1/breeds')
      .then((response) => {
          console.log('Data:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }
export default TestApi;