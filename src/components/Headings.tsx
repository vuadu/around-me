import React from 'react';
import { animated, useTransition } from 'react-spring';
import { Box, Button, Flex, Text } from 'theme-ui';

const Heading = ({
  active,
  children,
  duration,
}: React.PropsWithChildren<{ active?: boolean; duration: string }>) => {
  const commonStyles = {
    fontWeight: 'bold',
    fontSize: active ? '7.5vw' : '4.7vw',
    letterSpacing: '-1px',
    transition: `font-size ${duration} ease-out, opacity ${duration} ease-out`,
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

const Description = ({
  item,
  key,
  onExplore,
  width,
  height,
}: {
  item: {
    description?: string;
    buttonColor: string;
  };
  key: string;
  onExplore?: () => void;
  width: string;
  height: string;
}) => {
  const fadingTextPropsTransition = useTransition(item, () => key, {
    from: { opacity: -2 },
    enter: { opacity: 1 },
    leave: { opacity: -2 },
    config: { tension: 220, friction: 120, duration: 500 },
  });
  const fadingButtonPropsTransition = useTransition(item, () => key, {
    from: { opacity: -2 },
    enter: { opacity: 1 },
    leave: { opacity: -2 },
    config: { tension: 220, friction: 120, duration: 500, delay: 100 },
  });
  return (
    <Text
      sx={{
        position: 'absolute',
        top: `calc(${height} / 2 + 20px)`,
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
          <Text
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': '2' as any,
              '-webkit-box-orient': 'vertical' as any,
            }}
          >
            {item.description}
          </Text>
        </animated.div>
      ))}
      {fadingButtonPropsTransition.map(({ item, props, key }) => (
        <animated.div
          key={`${key}-button`}
          style={{ ...props, position: 'absolute', top: 120 }}
        >
          <Button
            sx={{
              color: 'white',
              backgroundColor: item.buttonColor,
              px: 30,
              py: 10,
              fontWeight: 'bold',
            }}
          >
            <Flex>
              Explore
              <Text sx={{ ml: 80, opacity: 0.5 }}>→</Text>
            </Flex>
          </Button>
        </animated.div>
      ))}
    </Text>
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

  return (
    <Box sx={{ position: 'relative', width, height }}>
      <Description
        item={data[currentIdx]}
        key={data[currentIdx].title}
        width={width}
        height={height}
        onExplore={() => props.onExplore?.(props.currentIdx)}
      />
      {data.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            transition: 'bottom 450ms ease, opacity 150ms ease',
            ...(currentIdx === idx
              ? { bottom: `calc(${height} / 2)` }
              : currentIdx < idx
              ? { bottom: 0 }
              : { bottom: `calc(${height} - 106px)` }),
            opacity: Math.abs(currentIdx - idx) < 2 ? 1 : 0,
          }}
        >
          <Heading active={idx === currentIdx} duration="450ms">
            {item.title}
          </Heading>
        </Box>
      ))}
    </Box>
  );
}
