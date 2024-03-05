import { useState, useEffect } from 'react';

import { useUrlChange } from '../utils';

export default function App() {
  const [showAll, setShowAll] = useState(false);
  const urlChangeStatus = useUrlChange();

  const handleClick = () => {
    if (showAll) {
      // my bot
      document
        .querySelector('.sidesheet-container')
        ?.classList.remove('sidesheet-container-show-all');
    } else {
      // my bot
      document
        .querySelector('.sidesheet-container')
        ?.classList.add('sidesheet-container-show-all');
    }
    setShowAll(!showAll);
  };

  useEffect(() => {
    setShowAll(false);
  }, [urlChangeStatus]);

  return (
    <div
      className={`content-toggle-container ${
        showAll ? 'content-toggle-container-on' : ''
      }`}
      onClick={handleClick}
    >
      <i
        className={`content-toggle-ball ${
          showAll ? 'content-toggle-ball-on' : ''
        }`}
      ></i>
    </div>
  );
}
