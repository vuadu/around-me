/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Box, Flex } from 'theme-ui';

const Dot = (props: { active?: boolean; size: string }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: props.size,
        height: props.size,
      }}
    >
      <Flex
        sx={{
          width: props.active ? '100%' : 8,
          height: props.active ? '100%' : 8,
          borderRadius: 100,
          backgroundColor: 'white',
          transition: '400ms',
          boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.1)',
        }}
      />
    </Flex>
  );
};

export function Indicators(props: {
  total: number;
  currentIdx: number;
  onSelect?: (idx: number) => void;
  width?: string;
  height?: string;
  maxDisplayingDots?: number;
}) {
  const { height = '80vh', width = '62px', maxDisplayingDots = 6 } = props;
  const [hoveringIdx, setHoveringIdx] = React.useState<number | null>(null);
  return (
    <Flex
      css={{
        position: 'relative',
        height,
        width,
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ opacity: 0.5 }}>
        <div
          css={{
            width: '2px',
            height: '100%',
            ml: '50%',
            backgroundColor: 'rgba(255,255,255,0.5)',
            boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.05)',
          }}
        />
        {Array.from({ length: props.total }).map((_, idx) => (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: `calc(${height} / 2 + ${height} / ${
                maxDisplayingDots + 1
              } * ${idx - props.currentIdx})`,

              transition: 'top 400ms',
            }}
          >
            <Dot
              key={idx}
              size={width}
              active={idx == props.currentIdx || idx === hoveringIdx}
            />
          </Box>
        ))}
      </Box>
      <Box>
        {Array.from({ length: props.total }).map((_, idx) => (
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 0,
              top: `calc(${height} / 2 + ${height} / ${
                maxDisplayingDots + 1
              } * ${idx - props.currentIdx})`,
              width,
              height: width,

              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              cursor: 'pointer',

              transition: 'top 400ms',
            }}
            onMouseEnter={() => setHoveringIdx(idx)}
            onMouseLeave={() => setHoveringIdx(null)}
            onClick={() => props.onSelect?.(idx)}
          >
            <Box
              sx={{
                cursor: 'pointer',
                transition: 'transform 400ms',
                transform: `scale(${
                  idx == props.currentIdx || idx === hoveringIdx ? '1,1' : '0,0'
                })`,
              }}
            >{`${idx + 1}`}</Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
}
