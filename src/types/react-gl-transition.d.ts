declare module 'react-gl-transition' {
  import React from 'react';
  const GLTransition: React.FC<{
    from: any;
    to: any;
    progress: number;
    transition: any;
  }>;
  export default GLTransition;
}
