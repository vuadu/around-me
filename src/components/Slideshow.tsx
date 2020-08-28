import { Surface } from 'gl-react-dom';
import GLImage from 'gl-react-image';
import GLTransitions from 'gl-transitions';
import React, { useEffect, useState } from 'react';
import GLTransition from 'react-gl-transition';

function usePrevious<T>(value: T) {
  const [temp, setTemp] = useState<T | null>(null);
  const [previous, setPrevious] = useState<T | null>(null);

  useEffect(() => {
    setTemp(value);
    setPrevious(temp);
  }, [value]);

  return previous;
}

export const Slideshow = (props: {
  slides: { image: string }[];
  duration?: number;
  currentIdx: number;
}) => {
  const { duration = 1500 } = props;
  const previousIdx = usePrevious(props.currentIdx);
  const to = props.slides[props.currentIdx].image;
  const from =
    (previousIdx !== null && props.slides[previousIdx].image) || null;
  const transition = GLTransitions[10];
  const [progress, setProgress] = useState(0);
  const INTERVAL = 1000 / 60;
  useEffect(() => {
    setProgress(0);
  }, [props.currentIdx]);
  useEffect(() => {
    if (progress < 1) {
      setTimeout(() => {
        setProgress(progress + INTERVAL / duration);
      }, INTERVAL);
    }
  }, [progress]);
  // console.log(progress, previousIdx, props.currentIdx);
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return (
    <Surface width={vw} height={vh}>
      {progress < 1 && from ? (
        <GLTransition
          from={<GLImage source={from} resizeMode="cover" />}
          to={<GLImage source={to} resizeMode="cover" />}
          progress={progress}
          transition={transition}
        />
      ) : (
        <GLImage source={to} resizeMode="cover" />
      )}
    </Surface>
  );
};
