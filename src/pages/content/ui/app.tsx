import { useEffect } from 'react';

import Toggle from './Toggle';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return (
    <div className="content-container">
      <p>skills</p>
      <Toggle></Toggle>
    </div>
  );
}
