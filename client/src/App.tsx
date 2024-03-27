import React from 'react';
import './App.css';
import api from './services/api';

function App() {
  
  const produtos = async ()  => {
    try {
      const response = await api.get('/produtos')

      console.log(response)
      return response.data
    } catch(error) {
      throw error;
    }
  } 

  produtos()
  

  return (
    <div className="App">
      <h1>Hora do show</h1>
    </div>
  );
}

export default App;
