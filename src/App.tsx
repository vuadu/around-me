import './App.css';

import React from 'react';
import { Flex } from 'theme-ui';

import { CardList } from './components/CardList';
import { Headings } from './components/Headings';
import { Indicators } from './components/Indicators';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const data = [
  {
    title: 'Australia',
    buttonColor: 'red',
    description: `1 ${description}`,
    items: [
      {
        title: '11',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=11',
      },
      {
        title: '12',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=12',
      },
      {
        title: '13',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=13',
      },
      {
        title: '14',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=14',
      },
    ],
  },
  {
    title: 'Europe',
    buttonColor: 'blue',
    description: `2 ${description.toUpperCase()}`,

    items: [
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
  },
  {
    title: 'Africa',
    buttonColor: 'red',
    description: `3 ${description}`,
    items: [
      {
        title: '31',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=31',
      },
      {
        title: '32',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=32',
      },
      {
        title: '33',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=33',
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
    buttonColor: 'green',
    description: `4 ${description.toUpperCase()}`,
    items: [
      {
        title: '41',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=41',
      },
      {
        title: '42',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=42',
      },
      {
        title: '43',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=43',
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
    items: [
      {
        title: '51',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=51',
      },
      {
        title: '52',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=52',
      },
      {
        title: '53',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=53',
      },
      {
        title: '54',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=54',
      },
    ],
  },
  {
    title: 'Arctic',
    buttonColor: 'red',
    description: `6 ${description.toUpperCase()}`,
    items: [
      {
        title: '61',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=61',
      },
      {
        title: '62',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=62',
      },
      {
        title: '63',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=63',
      },
      {
        title: '64',
        rate: 4,
        image: 'https://via.placeholder.com/468x600?text=64',
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
      <Flex></Flex>
      <Flex sx={{ justifyContent: 'space-between', ml: 40, mb: 40 }}>
        <Indicators
          total={data.length}
          currentIdx={currentIdx}
          onSelect={setCurrentIdx}
        />
        <Headings data={data} currentIdx={currentIdx} width="26vw" />
        <CardList list={data[currentIdx].items} width="54vw" />
      </Flex>
    </Flex>
  );
}

export default App;
