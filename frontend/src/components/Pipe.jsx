import React from 'react';

const Pipe = ({ x, gapY }) => {
  return (
    <div className="pipe pipe-top" style={{ left: x, height: gapY }}></div>
    <div className="pipe pipe-bottom" style={{ left: x, top: gapY + 150 }}></div>
  );
};

export default Pipe;