import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {api_endpoints} from './AppConstants';
type PokemonData = {
  id: string
  number: string
  name: string
  image: string
  fetchedAt: string
  attacks: {
    special: Array<{
      name: string
      type: string
      damage: number
    }>
  }
} 
const App: React.FC = () => {
  let url = `${api_endpoints.mainUrl}${api_endpoints.client_id}`;
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] =   useState<any>([]);
  const fetchImages = async () : Promise<string[] | any> => {
    await axios.get<string[]>(url)
      .then((response) =>{
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
  useEffect(()=> {
    setLoading(true);
    const result =  fetchImages() ;
    setPhotos(result);
    setLoading(false);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
          UnSplash Application
      </header>
    </div>
  );
}

export default App;
