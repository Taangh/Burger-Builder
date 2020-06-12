import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-e8a08.firebaseio.com/'
});

export default instance;