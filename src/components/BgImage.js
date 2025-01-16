import React from 'react';


function BgImage({ src, alt, width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      className="MainPage__main-container__right-side__bg-image"
      style={{ width: width, height: height , borderRadius: '20px',  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        objectFit: 'cover',
       }}   
    />
  );
}

export default BgImage;
