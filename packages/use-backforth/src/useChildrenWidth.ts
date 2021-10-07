import { useCallback, useMemo, useLayoutEffect, useRef } from 'react';
import { useSize, useWhyDidYouUpdate } from 'ahooks';
import { useBackforthOptionProps } from './index';
import { BasicTarget, getTargetElement } from './utils/dom';
import useRafState from './useRafState';
type DirectionType = 'forward' | 'backward';

export default function useChildrenWidth(
  target: BasicTarget,
  options: Pick<useBackforthOptionProps, 'direction' | 'snapFrame'> = {},
) {
  const firstRef = useRef(false);

  const { snapFrame = true, direction = 'row' } = options;

  const totalSize = useSize(target);

  const offset = useMemo(
    () => (direction === 'row' ? 'offsetWidth' : 'offsetHeight'),
    [direction],
  );

  // * 子元素长度数组
  const [childrenWidthArray, setChildrenWidthArray] = useRafState<number[]>(
    () => {
      const el = getTargetElement(target);
      const iterableChildren = ((el || {}) as HTMLElement).children || [];
      return Array.from(iterableChildren).map(
        (child) => (child as HTMLElement)[offset],
      );
    },
  );

  // * 根据下表返回对应的子元素长度
  const childrenWidthUtilIndex = useCallback(
    (targetIndex) => {
      return childrenWidthArray
        .filter((_, index) => index <= targetIndex)
        .reduce((acc, childWidth) => {
          return acc + childWidth;
        }, 0);
    },
    [childrenWidthArray],
  );

  // * 当子元素变动时
  useLayoutEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    if (firstRef.current == false) {
      const el = getTargetElement(target);
      const iterableChildren = ((el || {}) as HTMLElement).children || [];
      setChildrenWidthArray(
        Array.from(iterableChildren).map(
          (item) => (item as HTMLElement)[offset],
        ),
      );
      firstRef.current = true;
    }

    // * 观察子节点变动
    var observer = new MutationObserver((mutations) => {
      if (mutations[0]?.target) {
        const iterableChildren =
          ((mutations[0]?.target || {}) as HTMLElement).children || [];
        setChildrenWidthArray(
          Array.from(iterableChildren).map(
            (item) => (item as HTMLElement)[offset],
          ),
        );
      }
    });
    observer.observe(el as HTMLElement, {
      childList: true,
    });
    return () => {
      observer.disconnect();
    };
  }, [totalSize.width, totalSize.height, target]);

  // * 子元素总长度
  const childrenWidth = useMemo(() => {
    const totalWidth = childrenWidthArray.reduce((acc, childWidth) => {
      return acc + childWidth;
    }, 0);
    return totalWidth;
  }, [childrenWidthArray]);

  /**
   * 根据方向，传入X坐标，返回指定的坐标。 如果选择贴靠，则返回对应的子元素头部边界，否则直接返回
   * @param xCoordinate x 坐标
   * @param direction 方向
   * @returns 对应的坐标
   */
  const chooseChildRange = useCallback(
    (xCoordinate: number, direction: DirectionType = 'forward'): number => {
      if (xCoordinate < 0) {
        return 0;
      }
      // * 如果是选择贴到栅格上
      if (snapFrame) {
        if (childrenWidthArray) {
          let result: number = 0;
          let accWidth = 0;
          childrenWidthArray.forEach((width, index) => {
            accWidth += width;
            if (
              !result &&
              (xCoordinate < accWidth ||
                index === childrenWidthArray.length - 1)
            ) {
              result = direction === 'forward' ? accWidth : accWidth - width;
            }
          });

          return result;
        }
      }
      if (xCoordinate > childrenWidth) {
        return childrenWidth;
      }
      return xCoordinate;
    },
    [childrenWidthArray, snapFrame, childrenWidth],
  );

  return {
    childrenWidth,
    childrenWidthArray,
    chooseChildRange,
    childrenWidthUtilIndex,
  };
}
