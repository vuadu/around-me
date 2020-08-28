import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { AspectImage, Box, Flex, Text } from 'theme-ui';

import { useDelayedState } from '../hooks/delayed-state';

const Controls = (props: { onNext?: () => void; onPrev?: () => void }) => (
  <Flex sx={{ color: 'white', fontSize: 32 }}>
    <Flex
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '4vw',
        height: '4vw',
        borderRadius: '4vw',
        backgroundColor: `rgba(255,255,255,0.3)`,
        mr: 18,
        cursor: 'pointer',
      }}
      onClick={props.onPrev}
    >
      〈
    </Flex>
    <Flex
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '4vw',
        height: '4vw',
        borderRadius: '4vw',
        backgroundColor: `rgba(255,255,255,0.3)`,
        cursor: 'pointer',
      }}
      onClick={props.onNext}
    >
      〉
    </Flex>
  </Flex>
);

const Pagination = (props: { current: number; total: number }) => (
  <Flex
    sx={{
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    }}
  >
    <Text>{props.current.toString().padStart(2, '0')}</Text>
    <Box
      sx={{
        width: 65,
        height: 2,
        backgroundColor: 'white',
        opacity: 0.5,
        mx: 25,
      }}
    />
    <Text sx={{ opacity: 0.5 }}>{props.total.toString().padStart(2, '0')}</Text>
  </Flex>
);

export const AspectRatio = ({
  ratio = 4 / 3,
  children,
  ...props
}: React.PropsWithChildren<{ ratio: number }>) => (
  <Box
    sx={{
      position: 'relative',
      // overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: 0,
        paddingBottom: 100 / ratio + '%',
      }}
    />
    <Box
      {...props}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      {children}
    </Box>
  </Box>
);

const IMAGE_RATIO = 401 / 569;

const Card = ({
  image,
  w,
  delay,
  duration = 450,
}: {
  image: string;
  w: string;
  delay: number;
  duration?: number;
}) => {
  const [delayedImage] = useDelayedState(image, delay);
  const cardTransition = useTransition(delayedImage, (item) => item, {
    from: { transform: 'rotateY(180deg)' },
    enter: { transform: 'rotateY(0deg)' },
    leave: { transform: 'rotateY(-180deg)' },
    config: { tension: 220, friction: 120, duration },
  });
  return (
    <Box sx={{ perspective: 2000 }}>
      <AspectRatio
        ratio={IMAGE_RATIO}
        sx={{
          // transition: `transform ${duration}ms`,
          transformStyle: 'preserve-3d',
        }}
      >
        {cardTransition.map(({ item, props, key }) => (
          <animated.div
            style={{
              ...props,
              position: 'absolute',
              width: w,
              backfaceVisibility: 'hidden',
              transition: `width ${duration}ms`,
            }}
            key={key}
          >
            <AspectImage
              src={item}
              ratio={IMAGE_RATIO}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 8,
                // overflow: 'hidden',
              }}
            />
          </animated.div>
        ))}
      </AspectRatio>
    </Box>
  );
};

const CardTitle = ({
  dotSize,
  rate,
  title,
  delay,
  duration = 550,
}: {
  title: string;
  dotSize: number;
  rate: number;
  delay: number;
  duration?: number;
}) => {
  const [delayedTitle] = useDelayedState(title, delay);
  const [delayedRate] = useDelayedState(rate, delay);
  const titleTransition = useTransition(
    { title: delayedTitle, rate: delayedRate },
    (item) => item.title ?? '',
    {
      from: { opacity: -2 },
      enter: { opacity: 1 },
      leave: { opacity: -2 },
      config: { tension: 220, friction: 120, duration },
    }
  );
  return (
    <Box sx={{ height: 75 }}>
      {titleTransition.map(({ item, props, key }) => (
        <animated.div style={{ ...props, position: 'absolute' }} key={key}>
          <Text sx={{ color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
          <Flex>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Box
                sx={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize,
                  mr: dotSize,
                  transition: 'all 500ms',
                  my: 25,
                  backgroundColor: 'white',
                  opacity: idx < (item.rate ?? 0) ? 1 : 0.5,
                }}
              />
            ))}
          </Flex>
        </animated.div>
      ))}
    </Box>
  );
};

export function CardList(props: {
  list: {
    title: string;
    rate: number;
    image: string;
  }[];

  width?: string;
}) {
  const { width = '50vw' } = props;
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    setCurrentIdx(0);
  }, [props.list]);
  return (
    <Box sx={{ width, overflow: 'hidden', position: 'relative' }}>
      <Flex
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
          left: `calc((${width} / 2.5 + 40px) * ${-currentIdx})`,
          transition: 'left 500ms',
        }}
      >
        {props.list.map((item, idx) => {
          const isBig = idx <= currentIdx;
          const dotSize = isBig ? 12 : 10;
          return (
            <Box
              mr="40px"
              sx={{
                width: `calc(${width} / ${isBig ? 2.5 : 2.8})`,
                transition: 'width 500ms',
                flexShrink: 0,
              }}
            >
              <CardTitle delay={150 * idx} {...{ ...item, dotSize }} />
              <Card
                delay={150 * idx}
                image={item.image}
                w={`calc(${width} / ${isBig ? 2.5 : 2.8})`}
              />
            </Box>
          );
        })}
      </Flex>
      <Flex sx={{ position: 'absolute', bottom: 0, left: 25 }}>
        <Controls
          onNext={() => {
            if (currentIdx + 1 < props.list.length)
              setCurrentIdx(currentIdx + 1);
          }}
          onPrev={() => {
            if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
          }}
        />
      </Flex>
      <Flex sx={{ position: 'absolute', bottom: 0, right: 70 }}>
        <Pagination current={currentIdx + 1} total={props.list.length} />
      </Flex>
    </Box>
  );
}
