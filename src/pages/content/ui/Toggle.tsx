import { useState } from 'react';

export default function App() {
  const [showSkills, setShowSkills] = useState(false);

  const handleClick = () => {
    if (showSkills) {
      document
        .querySelector('.sidesheet-container')
        ?.classList.remove('sidesheet-container-with-skills');
    } else {
      document
        .querySelector('.sidesheet-container')
        ?.classList.add('sidesheet-container-with-skills');
    }
    setShowSkills(!showSkills);
  };

  return (
    <div
      className={`content-toggle-container ${
        showSkills ? 'content-toggle-container-on' : ''
      }`}
      onClick={handleClick}
    >
      <i
        className={`content-toggle-ball ${
          showSkills ? 'content-toggle-ball-on' : ''
        }`}
      ></i>
    </div>
  );
}
