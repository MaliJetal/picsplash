import React from 'react';
import '../App.css';
import '../index.css';

export interface PhotoProps{
  key : Number,
  image : any,
  
}

interface photoType{
  urls: any,
  alt_description: string,
  likes: string,
  user: {
    name: string,
    portfolio_url: string,
    profile_image: any
  },
  
};

const Photo = ({
  urls:{regular},
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: {medium}
  }
}: photoType) => {
  return(
    <>
      <article className="photo">
        <img src={regular} alt={alt_description} />
        <div className='photo-info'>
          <h3>{name}</h3>
          <p>{likes} likes</p>
        </div>
      
      <a href={portfolio_url}>
        <img src={medium} alt={name} className="user-img" />
      </a>
      </article>
    </>
  )
}

export default Photo;