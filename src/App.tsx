import React, { useEffect, useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import {api_endpoints} from './AppConstants';
import Photo from './components/Photo';

const App = () => {
  let url = `${api_endpoints.mainUrl}${api_endpoints.client_id}`;
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] =   useState<any>([]);
  const fetchImages = async () : Promise<string[] | any> => {
    await axios.get<string[]>(url)
      .then((response) =>{
        setPhotos(response.data)
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
  useEffect(()=> {
    setLoading(true);
    fetchImages() ;
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) : void => {
    e.preventDefault();
    console.log('%cApp.tsx line:30 Hello', 'color: #007acc;');
  }
  return (
    <div className="App">
      PicSplash
      <section className='search'>
        <form className="search-form">
          <input type="text" name="search" placeholder='search' className='form-input' />
          <button type="submit" className='form-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>        
        </form>
      </section>
      <section className='photos'>
        <div className='photo-gallery'>
          Photo
          {photos.map((image : any) => {
            return <Photo key= {image.id}  {...image} />
          })}
        </div>
        {loading && <h2 className='loading'>Loading ...</h2>}
      </section>
    </div>
  );
}

export default App;
