import React, { useEffect, useState, useRef } from 'react';
import {FaSearch} from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import './index.css';
import {api_endpoints} from './AppConstants';
import Photo from './components/Photo';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] =   useState<any>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const mounted = useRef(false);
  
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
          console.log("inside photos");
          if (query && page === 1) {
            console.log("triggered");
            return response.data.results;
          } else if (query) {
            console.log("triggered2");
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
    fetchImages();
    setLoading(false);
    // eslint-disable-next-line
  }, [page]);

  useEffect(()=> {
    if(!mounted.current){
      mounted.current = true;
      return;
    }
    if(query){
      setPage(1)
    }

  }, [])

  useEffect(()=> {
    const event : any = window.addEventListener("scroll", () : any => {
      if(!loading && (window.innerHeight+ window.scrollY) >= document.body.scrollHeight)
      {
        setPage(prevPage => prevPage+1);
      }     
    }) 

    return () => window.removeEventListener('scroll', event);
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) : void => {
    e.preventDefault();
    if(!query) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
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
          {photos.map((image : any, index: Number) => {
            return <Photo key= {index}  {...image} />
          })}
        </div>
        {loading && <h2 className='loading'>Loading ...</h2>}
      </section>
    </div>
  );
}

export default App;
