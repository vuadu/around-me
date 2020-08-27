declare module 'gl-react-image' {
  import React from 'react';
  const GLImage: React.FC<{
    source: string;
    resizeMode?: string;
    zoom?: number;
    center?: [number, number];
  }>;
  export default GLImage;
}
