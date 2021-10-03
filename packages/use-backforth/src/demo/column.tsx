import React, { useRef } from 'react';
import { useOffset } from 'pra-hooks';

const Offset = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { handleForward, canForward, handleBackward, canBackward } = useOffset(
    ref,
    {
      snapFrame: true,
      canSwitch: true,
      direction: 'column',
    },
  );

  const noWrapStyle = {
    height: 150,
  };

  return (
    <div>
      <div style={{ overflow: 'hidden' }}>
        <div ref={ref} style={noWrapStyle}>
          <div
            style={{ height: 100, width: 100, backgroundColor: 'yellow' }}
          ></div>
          <div
            style={{ height: 100, width: 100, backgroundColor: 'red' }}
          ></div>
          <div
            style={{ height: 100, width: 100, backgroundColor: 'blue' }}
          ></div>
        </div>
      </div>
      {canBackward && <button onClick={() => handleBackward()}>top</button>}
      {canForward && <button onClick={() => handleForward()}>buttom</button>}
    </div>
  );
};

Offset.propTypes = {};

export default Offset;
