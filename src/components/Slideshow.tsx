import { Surface } from 'gl-react-dom';
import GLImage from 'gl-react-image';
import React, { useEffect, useState } from 'react';
import GLTransition from 'react-gl-transition';

import { useDelayedState } from '../hooks/delayed-state';

function usePrevious<T>(value: T) {
  const [temp, setTemp] = useState<T | null>(null);
  const [previous, setPrevious] = useState<T | null>(null);

  useEffect(() => {
    setTemp(value);
    setPrevious(temp);
  }, [value]);

  return previous;
}

const newTransition = {
  glsl: `// Author: Dang Tien Cuong
  // License: MIT
  
  #define PI 3.14159265359
  
  const vec2 center = vec2(1.1, 0.9);
  const vec2 center2 = vec2(1., 0.);
  const float rotations = -.47;
  const float scale = 1.8;
  float Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {
      if (time == 0.0)
          return begin;
      else if (time == duration)
          return begin + change;
      time = time / (duration / 2.0);
      if (time < 1.0)
          return change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;
      return change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;
  }
  
  vec2 mirrorRepeat(vec2 uv) {
    return 1.0 - abs(1.0 - mod(uv, 2.0));
  }
  float rand (vec2 co) {
    return 0.;
    // return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }
  vec2 rotated(vec2 uv, vec2 origin, float t) {
    vec2 difference = uv - origin;
    vec2 dir = normalize(difference);
    float dist = length(difference);
    
    float angle = 2.0 * PI * rotations * (t < 0.5 ? t : t - 1.);
    
    float c = cos(angle);
    float s = sin(angle);
    
    float currentScale = mix(scale, 1.0, 2.0 * abs(t - 0.5));
    
    vec2 rotatedDir = vec2(dir.x  * c - dir.y * s, dir.x * s + dir.y * c);
    return origin + rotatedDir * dist / currentScale;
  }
  
  vec4 transition (vec2 uv) {
    float t = Exponential_easeInOut(0., 1., 1., progress);
    if (t <=0.5) {
      return getFromColor(mirrorRepeat(rotated(uv, center, t)) + rand(uv) / 10. * t);
    } else {
      return getToColor(mirrorRepeat(rotated(uv, center2, t)) + rand(uv) / 10. * (1. - t));
    }
  }
  
`,
  name: 'transition',
};

export const Slideshow = (props: {
  slides: { image: string }[];
  duration?: number;
  currentIdx: number;
  delay?: number;
}) => {
  const { duration = 2050, delay = 200 } = props;
  const [delayedCurrentIdx] = useDelayedState(props.currentIdx, delay);
  const [currentIdx, setCurrentIdx] = useState(
    delayedCurrentIdx ?? props.currentIdx
  );
  const previousIdx = usePrevious(currentIdx);
  const from = props.slides[previousIdx ?? currentIdx].image;
  const to = props.slides[currentIdx].image;
  const [progress, setProgress] = useState(0);
  const INTERVAL = 1000 / 60;
  useEffect(() => {
    if (
      progress >= 1 &&
      delayedCurrentIdx !== currentIdx &&
      delayedCurrentIdx !== null
    ) {
      setProgress(0);
      setCurrentIdx(delayedCurrentIdx);
    }
  }, [delayedCurrentIdx, progress < 1]);
  useEffect(() => {
    if (progress < 1) {
      setTimeout(() => {
        setProgress(progress + INTERVAL / duration);
      }, INTERVAL);
    }
  }, [progress]);
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
      {progress > 0 && from !== to ? (
        <GLTransition
          from={<GLImage source={from} resizeMode="cover" />}
          to={<GLImage source={to} resizeMode="cover" />}
          progress={progress}
          transition={newTransition}
        />
      ) : (
        <GLImage source={from} resizeMode="cover" />
      )}
    </Surface>
  );
};
