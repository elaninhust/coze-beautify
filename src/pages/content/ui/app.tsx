import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return (
    <div className="content-view-style-may-be-not-working crx-class">
      content view
    </div>
  );
}
