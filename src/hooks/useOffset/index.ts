import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  useSize,
  useDebounce,
  useHover,
  useWhyDidYouUpdate,
  useThrottleFn,
} from 'ahooks';
import useTranslate from './useTranslate';
import useChildrenWidth from './useChildrenWidth';
import { BasicTarget, getTargetElement } from '@/utils/dom';
// import useStateRef from '../useStateRef';
// import { debounce, throttle } from 'lodash';

export interface useOffsetOptionProps {
  canSwitch?: boolean;
  snapFrame?: boolean;
  wheelEvent?: boolean;
  direction?: 'row' | 'column';
}

// type = NewW

// function detectTrackPad(e: WheelEvent) {
//   var isTrackpad = false;
//   if (e.wheelDeltaY) {
//     if (e.wheelDeltaY === e.deltaY * -3) {
//       isTrackpad = true;
//     }
//   } else if (e.wheelDeltaX) {
//     if (e.wheelDeltaX === e.deltaX * -3) {
//       isTrackpad = true;
//     }
//   } else if (e.deltaMode === 0) {
//     isTrackpad = true;
//   }
//   return isTrackpad;
// }

function useOffset(
  target: BasicTarget,
  { canSwitch = true, snapFrame = true, wheelEvent = false, direction = 'row' }: useOffsetOptionProps = {},
) {
  const [translateX, setTranslateX] = useState(0);
  // const debouncedTranslateX = useDebounce(translateX, { wait: 80 });

  const size = useSize(target);
  const isHovering = useHover(target);
  const { run: MoveXRef } = useTranslate(target, { direction });
  const { childrenWidth, chooseChildRange } = useChildrenWidth(target, {
    snapFrame,
    direction,
  });

  // const [accX, setAccX] = useState(0);
  // const accXRef = useStateRef(accX);

  // const wheelMoveDebounce = useCallback(
  //   (targetX: number) => {
  //     MoveXRef(targetX);
  //     setTranslateX(targetX);
  //     setAccX(targetX);
  //   },
  //   [MoveXRef],
  // );

  // * 滚动
  // const wheelMove = useCallback(
  //   (delta) => {
  //     const toRright = delta > 0;
  //     const targetX = delta + debouncedTranslateX;
  //     if (toRright) {
  //       const noMax = targetX + (size.width || 0) <= childrenWidth;
  //       if (noMax) {
  //         wheelMoveDebounce(targetX);
  //       } else {
  //         wheelMoveDebounce(childrenWidth - (size.width || 0));
  //       }
  //     } else {
  //       const noMin = targetX > 0;
  //       if (noMin) {
  //         wheelMoveDebounce(targetX);
  //       } else {
  //         wheelMoveDebounce(0);
  //       }
  //     }
  //   },
  //   [debouncedTranslateX, childrenWidth],
  // );

  // const { run: ThrottlewheelMove } = useThrottleFn(wheelMove, { wait: 200 });

  // useEffect(() => {
  //   if (ref.current && wheelEvent)
  //     ref.current.addEventListener('wheel', (event) => {
  //       event.preventDefault();
  //       if (detectTrackPad(event)) {
  //         console.log('trackpad');
  //         let detail = event.deltaX || event.deltaY;
  //         console.log(accXRef.current)
  //         setAccX(accXRef.current + detail);
  //         console.log(accXRef.current)

  //         // ThrottlewheelMove(accXRef.current + detail)
  //       } else {
  //         console.log('mouse');
  //         ThrottlewheelMove(event.deltaY);
  //       }
  //     });
  // }, [wheelMove]);

  const viewPortSpan = useMemo(() => {
    if (direction === 'row') {
      return size.width;
    } else if (direction === 'column') {
      return size.height;
    }
  }, [size, direction]);

  const handleForward = useCallback(
    (e?: React.MouseEvent) => {
      const el = getTargetElement(target);
      if (!el) return;
      if (childrenWidth) {
        const toX = translateX + (viewPortSpan || 0);
        setTranslateX(chooseChildRange(toX, 'backward'));
        MoveXRef(chooseChildRange(toX, 'backward'));
      }
    },
    [childrenWidth, translateX, viewPortSpan],
  );

  const handleBackward = useCallback(
    (e?: React.MouseEvent) => {
      const el = getTargetElement(target);
      if (!el) return;
      if (childrenWidth) {
        const toX = translateX - (viewPortSpan || 0);
        setTranslateX(chooseChildRange(toX, 'forward'));
        MoveXRef(chooseChildRange(toX, 'forward'));
      }
    },
    [childrenWidth, translateX, viewPortSpan],
  );

  const canForward = useMemo(() => {
    if (!canSwitch) return false;
    if (viewPortSpan && translateX + viewPortSpan < childrenWidth) {
      return true;
    }
    return false;
  }, [translateX, viewPortSpan, childrenWidth]);

  const canBackward = useMemo(() => {
    if (!canSwitch) return false;
    if (viewPortSpan && translateX > 0) {
      return true;
    }
    return false;
  }, [translateX, viewPortSpan]);

  return {
    handleForward,
    handleBackward,
    canForward,
    canBackward,
    isHovering,
  };
}

export default useOffset;
