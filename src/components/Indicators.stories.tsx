import React from 'react';

import { Indicators } from './Indicators';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
export default {
  title: 'Indicators',
  component: Indicators,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export const DefaultIndicator = () => {
  const [currentIdx, setCurrentIdx] = React.useState(0);

  return (
    <div style={{ backgroundColor: '#333', width: '100vw', height: '100vh' }}>
      <Indicators total={6} currentIdx={currentIdx} onSelect={setCurrentIdx} />
    </div>
  );
};
