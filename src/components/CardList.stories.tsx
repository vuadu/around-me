import React from 'react';

import { CardList } from './CardList';

export default {
  title: 'CardList',
  component: CardList,
};

export function Default() {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  // const description =
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setCurrentIdx((currentIdx + 1) % data.length);
  //   }, 5000);
  // }, [currentIdx]);
  const data = [
    [
      {
        title: '1',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=1',
      },
      {
        title: '2',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=2',
      },
      {
        title: '3',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=3',
      },
      {
        title: '4',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=4',
      },
    ],
    [
      {
        title: '21',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=21',
      },
      {
        title: '22',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=22',
      },
      {
        title: '23',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=23',
      },
      {
        title: '24',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=24',
      },
    ],
  ];
  return (
    <div>
      <button onClick={() => setCurrentIdx(1 - currentIdx)}>flip</button>
      <div style={{ backgroundColor: '#333', width: '100vw', height: '100vh' }}>
        <CardList width="100vw" list={data[currentIdx]} />
        {/* <Headings data={data} currentIdx={currentIdx} /> */}
      </div>
    </div>
  );
}
