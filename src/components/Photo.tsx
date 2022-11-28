import React from 'react';

export interface PhotoProps{
  key : Number,
  image : any,
  
}

declare namespace JSX {
  interface IntrinsicElements {
    div:  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  }
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
      <h2>Photo Component</h2>
      <article className="photo">
        <img src={regular} alt={alt_description} />
        <div className='phtot-info'>
          <h3>{name}</h3>
          <p>{likes} likes</p>
        </div>
      </article>
      <a href={portfolio_url}>
        <img src={medium} alt={name} className="user-img" />
      </a>
    </>
  )
}

export default Photo;