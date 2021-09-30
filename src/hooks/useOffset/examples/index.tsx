import React, { useRef, useState, useEffect } from 'react';
import { useOffset } from 'pra-hook';

const dataSource: Record<string, any>[] = [
  { minWidth: 100, height: 100, backgroundColor: 'yellow' },
  { minWidth: 100, height: 100, backgroundColor: 'red' },
  { minWidth: 100, height: 100, backgroundColor: 'blue' },
];

const moreRecord = [{ minWidth: 300, height: 100, backgroundColor: 'pink' }];

const Offset = () => {
  const [state, setState] = useState<Record<string, any>[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { handleForward, canForward, canBackward, handleBackward, isHovering } =
    useOffset(ref, {
      snapFrame: false,
      wheelEvent: true,
      direction: 'row',
      canSwitch: true,
    });

  const noWrapStyle = {
    display: 'flex',
    flexFlow: 'row nowrap',
  };

  useEffect(() => {
    setTimeout(() => {
      setState(
        dataSource
          .map((item) => ({ ...item, minWidth: item.minWidth + 100 }))
          .concat(moreRecord),
      );
    }, 1000);
  }, []);

  return (
    <div style={{ overflow: 'hidden', width: 120 }}>
      <div ref={ref} style={noWrapStyle}>
        {state.map((props) => (
          <div style={props}></div>
        ))}
      </div>
      {canBackward && <button onClick={() => handleBackward()}>left</button>}
      {canForward && <button onClick={() => handleForward()}>right</button>}
      {isHovering ? 'hover' : 'leaveHover'}
    </div>
  );
};

Offset.propTypes = {};

export default Offset;
