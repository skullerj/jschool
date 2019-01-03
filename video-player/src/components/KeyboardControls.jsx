import React from 'react';
import '../styles/KeyboardControls.css';

const KeyboardControls = () => {
  return (
    <div className="controls-container">
      <div className="control">
        <span className="key">H</span>
        <span className="description">Next</span>
      </div>
      <div className="control">
        <span className="key">J</span>
        <span className="description">Back</span>
      </div>
      <div className="control">
        <span className="key">SPACE</span>
        <span className="description">Play/Pause</span>
      </div>
    </div>
  );
};

export default KeyboardControls;
