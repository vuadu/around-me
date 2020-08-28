import './App.css';

import React from 'react';
import { Box, Flex } from 'theme-ui';

import { CardList } from './components/CardList';
import { Headings } from './components/Headings';
import { Indicators } from './components/Indicators';
import { Slideshow } from './components/Slideshow';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const data = [
  {
    title: 'Africa',
    buttonColor: '#603232',
    description: `3 ${description}`,
    image: '/images/africa-0.jpg',
    items: [
      {
        title: '31',
        rate: 4,
        image: '/images/africa-1.jpg',
      },
      {
        title: '32',
        rate: 4,
        image: '/images/africa-2.jpg',
      },
      {
        title: '33',
        rate: 4,
        image: '/images/africa-3.jpg',
      },
      {
        title: '34',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=34',
      },
    ],
  },
  {
    title: 'Asia',
    buttonColor: '#367C5C',
    description: `4 ${description.toUpperCase()}`,
    image: '/images/asia-0.jpg',
    items: [
      {
        title: '41',
        rate: 4,
        image: '/images/asia-1.jpg',
      },
      {
        title: '42',
        rate: 4,
        image: '/images/asia-2.jpg',
      },
      {
        title: '43',
        rate: 4,
        image: '/images/asia-3.jpg',
      },
      {
        title: '44',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=44',
      },
    ],
  },
  {
    title: 'America',
    buttonColor: 'orange',
    description: `5 ${description}`,
    image: '/images/america-0.jpg',
    items: [
      {
        title: '31',
        rate: 4,
        image: '/images/america-1.jpg',
      },
      {
        title: '32',
        rate: 4,
        image: '/images/america-2.jpg',
      },
      {
        title: '33',
        rate: 4,
        image: '/images/america-3.jpg',
      },
      {
        title: '34',
        rate: 4,
        image: '/images/america-4.jpg',
      },
    ],
  },
  {
    title: 'Australia',
    buttonColor: 'red',
    description: `1 ${description}`,
    image: '/images/asia-0.jpg',
    items: [
      {
        title: '41',
        rate: 4,
        image: '/images/asia-1.jpg',
      },
      {
        title: '42',
        rate: 4,
        image: '/images/asia-2.jpg',
      },
      {
        title: '43',
        rate: 4,
        image: '/images/asia-3.jpg',
      },
      {
        title: '44',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=44',
      },
    ],
  },
  {
    title: 'Europe',
    buttonColor: 'blue',
    description: `2 ${description.toUpperCase()}`,
    image: '/images/euro-0.jpg',
    items: [
      {
        title: '31',
        rate: 4,
        image: '/images/euro-1.jpg',
      },
      {
        title: '32',
        rate: 4,
        image: '/images/euro-2.jpg',
      },
      {
        title: '33',
        rate: 4,
        image: '/images/euro-3.jpg',
      },
      {
        title: '34',
        rate: 4,
        image: '/images/euro-4.jpg',
      },
    ],
  },
];

// total: number;
// currentIdx: number;
// onSelect?: (idx: number) => void;
// width?: string;
// height?: string;
// maxDisplayingDots?: number;
function App() {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        bg: '#333',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#778',
        }}
      >
        <Slideshow slides={data} currentIdx={currentIdx} />
      </Box>
      <Flex />
      <Flex sx={{ justifyContent: 'space-between', mb: '2vw' }}>
        <Box sx={{ ml: '2vw' }}>
          <Indicators
            total={data.length}
            currentIdx={currentIdx}
            onSelect={setCurrentIdx}
          />
        </Box>
        <Headings data={data} currentIdx={currentIdx} width="26vw" />
        <CardList list={data[currentIdx].items} width="54vw" />
      </Flex>
    </Flex>
  );
}

export default App;
