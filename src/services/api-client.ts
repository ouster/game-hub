import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'fcc6595b4c374ee381d7c5fb4c216762', // need a backend to secure this properly
  },
});
