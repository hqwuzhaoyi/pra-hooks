import { MutableRefObject } from 'react';
import { useOffsetOptionProps } from './index';
import type { BasicTarget } from '@/utils/dom';
import { getTargetElement } from '@/utils/dom';

export default function useTranslate(
  ref: BasicTarget,
  { direction }: Pick<useOffsetOptionProps, 'direction'>,
) {
  const run = (xCoordinate: number) => {
    const el = getTargetElement(ref);
    if ((xCoordinate || xCoordinate === 0) && el) {
      ((el || {}) as HTMLElement).style.transform =
        direction === 'row'
          ? `translateX(-${xCoordinate}px)`
          : `translateY(-${xCoordinate}px)`;
    } else {
      direction === 'row'
        ? console.warn(ref, '操作translateX失败')
        : console.warn(ref, '操作translateY失败');
    }
  };
  return { run };
}
