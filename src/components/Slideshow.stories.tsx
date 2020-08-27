import React from 'react';

import { Slideshow } from './Slideshow';

export default {
  title: 'Slideshow',
  component: Slideshow,
};

export const Default = () => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const data = [
    {
      image: 'https://via.placeholder.com/468x600?text=1',
    },
    {
      image: 'https://via.placeholder.com/468x600?text=2',
    },
    {
      image: 'https://via.placeholder.com/468x600?text=3',
    },
    {
      image: 'https://via.placeholder.com/468x600?text=4',
    },
  ];

  return (
    <div style={{ backgroundColor: '#333', width: '100vw', height: '100vh' }}>
      <Slideshow slides={data} currentIdx={currentIdx} />
      <button onClick={() => setCurrentIdx((currentIdx + 1) % data.length)}>
        next
      </button>
    </div>
  );
};
