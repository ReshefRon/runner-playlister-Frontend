// Loader.js
import React from 'react';
import '../styles/Loader.css'; // Import CSS for the loader
import LoaderGif from '../images/Loader.gif';

const Loader = () => {
  return (
    <div className="loader">
      <img src ={LoaderGif} className='loader-gif' />
    </div>
  );
};

export default Loader;
