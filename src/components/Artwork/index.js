import React from 'react';
import './index.css';
import loop from './loop.svg';

function Artwork({artObject}) {
    return artObject?.primaryImage
        ? <img key="art" src={artObject.primaryImage} alt='An amazing work of art' className='Artwork'/>
        : <img key="loading" style={{stroke: "red"}} src={loop} alt='loop' className='App-logo'/>
}

export default Artwork;