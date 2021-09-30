import useChildrenWidth from '../useChildrenWidth';
import { renderHook } from '@testing-library/react-hooks';
import translateEnv from './translateEnv'
import createTranslateBlockBeforeEach from './createTranslateBlockBeforeEach'

describe('useChildrenWidth', () => {
  it('should be defined', () => {
    expect(useChildrenWidth).toBeDefined();
  });

  translateEnv()

  createTranslateBlockBeforeEach()

  it('should work without options', () => {
    const { result, rerender } = renderHook(() =>
      useChildrenWidth(document.getElementById('container') as HTMLElement),
    );
    expect(result.current.childrenWidth).toEqual(800);
    expect(result.current.childrenWidthArray).toEqual([200, 200, 200, 200]);
    expect(result.current.chooseChildRange(700, 'forward')).toEqual(800);
    expect(result.current.chooseChildRange(700, 'backward')).toEqual(600);
    expect(result.current.chooseChildRange(700)).toEqual(800);
  });
  it('should work with snapFrame equal false', () => {
    const { result, rerender } = renderHook(() =>
      useChildrenWidth(document.getElementById('container') as HTMLElement, {
        snapFrame: false,
      }),
    );
    expect(result.current.childrenWidth).toEqual(800);
    expect(result.current.childrenWidthArray).toEqual([200, 200, 200, 200]);
    expect(result.current.chooseChildRange(500)).toEqual(500);
    expect(result.current.chooseChildRange(550)).toEqual(550);
    expect(result.current.chooseChildRange(-50)).toEqual(0);
    expect(result.current.chooseChildRange(0)).toEqual(0);
  });
  it('should work with direction equal column', () => {
    const { result, rerender } = renderHook(() =>
      useChildrenWidth(document.getElementById('container') as HTMLElement, {
        direction: 'column',
      }),
    );
    expect(result.current.childrenWidth).toEqual(600);
    expect(result.current.childrenWidthArray).toEqual([150, 150, 150, 150]);
    expect(result.current.chooseChildRange(290)).toEqual(300);
    expect(result.current.chooseChildRange(290, 'backward')).toEqual(150);
    expect(result.current.chooseChildRange(500)).toEqual(600);
    expect(result.current.chooseChildRange(800)).toEqual(600);
    expect(result.current.chooseChildRange(800, 'backward')).toEqual(450);
  });

  it('should work with snapFrame equal false and direction equal column', () => {
    const { result, rerender } = renderHook(() =>
      useChildrenWidth(document.getElementById('container') as HTMLElement, {
        snapFrame: false,
        direction: 'column',
      }),
    );
    expect(result.current.childrenWidth).toEqual(600);
    expect(result.current.childrenWidthArray).toEqual([150, 150, 150, 150]);
    expect(result.current.chooseChildRange(500)).toEqual(500);
    expect(result.current.chooseChildRange(800)).toEqual(600);
    expect(result.current.chooseChildRange(-50)).toEqual(0);
    expect(result.current.chooseChildRange(0)).toEqual(0);
  });
});
