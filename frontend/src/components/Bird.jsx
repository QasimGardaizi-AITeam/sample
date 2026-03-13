import React from 'react';

const Bird = ({ y }) => {
  return (
    <div className="bird" style={{ top: y }}></div>
  );
};

export default Bird;