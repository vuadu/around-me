import React from 'react';
import { animated, useTransition } from 'react-spring';
import { Box, Button, Text } from 'theme-ui';

const Heading = ({
  active,
  children,
}: React.PropsWithChildren<{ active?: boolean }>) => {
  const commonStyles = {
    fontWeight: 'bold',
    fontSize: active ? '150px' : '90px',
    letterSpacing: '-1px',
    transition: 'font-size 800ms, opacity 800ms',
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Text
        sx={{
          opacity: active ? 0 : 1,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))',
          backgroundClip: 'text',
          textFillColor: 'transparent' as any,
          '-webkit-background-clip': 'text' as any,
          '-webkit-text-fill-color': 'transparent' as any,
          ...commonStyles,
        }}
      >
        {children}
      </Text>
      <Text
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'white',
          opacity: active ? 1 : 0,
          ...commonStyles,
        }}
      >
        {children}
      </Text>
    </Box>
  );
};

export function Headings(props: {
  data: {
    title: string;
    description?: string;
    buttonColor: string;
  }[];
  currentIdx: number;
  onExplore?: (idx: number) => void;
  width?: string;
  height?: string;
}) {
  const { data, currentIdx, width = '50vw', height = '80vh' } = props;
  const fadingTextPropsTransition = useTransition(
    data[currentIdx],
    (item) => item.title,
    {
      from: { opacity: -2 },
      enter: { opacity: 1 },
      leave: { opacity: -2 },
      config: { tension: 220, friction: 120, duration: 2000 },
    }
  );

  return (
    <Box sx={{ position: 'relative', width, height }}>
      <Text
        sx={{
          position: 'absolute',
          top: `calc(${height} / 2 + 60px)`,
          color: 'white',
          fontSize: 16,
          lineHeight: 2,
        }}
      >
        {fadingTextPropsTransition.map(({ item, props, key }) => (
          <animated.div
            key={key}
            style={{ ...props, width, position: 'absolute' }}
          >
            <Text>{item.description}</Text>
            <Button
              sx={{
                color: 'white',
                backgroundColor: item.buttonColor,
                px: 30,
                py: 10,
              }}
            >
              Explore
              <Text sx={{ ml: 80, opacity: 0.5, display: 'inline-block' }}>
                →
              </Text>
            </Button>
          </animated.div>
        ))}
      </Text>
      {data.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            transition: 'all 800ms',
            ...(currentIdx === idx
              ? { bottom: `calc(${height} / 2)` }
              : currentIdx < idx
              ? { bottom: 0 }
              : { top: 0 }),
            opacity: Math.abs(currentIdx - idx) < 2 ? 1 : 0,
          }}
        >
          <Heading active={idx === currentIdx}>{item.title}</Heading>
        </Box>
      ))}
    </Box>
  );
}
