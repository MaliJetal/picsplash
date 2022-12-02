import React, { useEffect, useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import './index.css';
import {api_endpoints} from './AppConstants';
import Photo from './components/Photo';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] =   useState<any>([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState<string>("");
  
  const mainurl = `${api_endpoints.mainUrl}${api_endpoints.client_id}`;
  const searchurl = `${api_endpoints.searchUrl}${api_endpoints.client_id}`;

  const fetchImages = async () : Promise<string[] | any> => {
    let url : string;
    const pageUrl = `&page=${page}`;
    const queryUrl =  `&query=${query}`;
    if(query){
      url = `${searchurl}${pageUrl}${queryUrl}`;
    }
    else{
      url = `${mainurl}${pageUrl}`;
    }
    await axios.get(url)
      .then((response) =>{
        setPhotos((oldPhotos : any) => {
          if (query && page === 1) {
            return response.data.results;
          } else if (query) {
            return [...oldPhotos, ...response.data.results];
          } else {
            return [...oldPhotos, ...response.data];
          }
        })
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
  }, [page]);

  useEffect(()=> {
    const event : any = window.addEventListener("scroll", () : any => {
      if(!loading && (window.innerHeight+ window.scrollY) >= document.body.scrollHeight)
      {
        setPage(prevPage => prevPage+1);
      }  
        
    }) 

    return () => window.removeEventListener('scroll', event);
  }, [])

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) : void => {
    e.preventDefault();
    setPage(1);
    // if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    // console.log("object")
  }
  return (
    <div className="App">
      PicSplash
      <section className='search'>
        <form className="search-form">
          <input type="text" name="search" placeholder='search' className='form-input' value={query} onChange={(e) => setQuery(e.target.value)}/>
          <button type="submit" className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>        
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
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
