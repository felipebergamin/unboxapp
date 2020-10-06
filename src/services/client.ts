import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGFkY2M1ZmE2NzkxOTI4M2QwZWMxY2Q2ODlkZTBlNCIsInN1YiI6IjVmN2I2OWEwM2UyZWM4MDAzN2Q2OTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rPiHPdXAXiJOWr-X0RIPyGEB09yzkRZ-95ZaHU1b5ZE',
  },
});
