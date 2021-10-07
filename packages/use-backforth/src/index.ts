import React, { useMemo, useState, useCallback } from 'react';
import { useSize } from 'ahooks';
import useTranslate from './useTranslate';
import useChildrenWidth from './useChildrenWidth';
import { BasicTarget, getTargetElement } from './utils/dom';

export interface useBackforthOptionProps {
  canSwitch?: boolean;
  snapFrame?: boolean;
  wheelEvent?: boolean;
  direction?: 'row' | 'column';
}

function useBackforth(
  target: BasicTarget,
  {
    canSwitch = true,
    snapFrame = true,
    wheelEvent = false,
    direction = 'row',
  }: useBackforthOptionProps = {},
) {
  const [translateX, setTranslateX] = useState(0);
  // const debouncedTranslateX = useDebounce(translateX, { wait: 80 });

  const size = useSize(target);
  const { run: MoveXRef } = useTranslate(target, { direction });
  const { childrenWidth, chooseChildRange } = useChildrenWidth(target, {
    snapFrame,
    direction,
  });

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
  };
}

export default useBackforth;
