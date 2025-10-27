const config = {
  API_URL: process.env.REACT_APP_API_URL || 
           (process.env.NODE_ENV === 'production' 
             ? 'https://c305r1hk38.execute-api.eu-north-1.amazonaws.com/prod'
             : 'http://localhost:8080')
};

export default config;