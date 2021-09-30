import useTranslate from '../useTranslate';
import { renderHook, act } from '@testing-library/react-hooks';

type UseTranlateArgumentsType = Parameters<typeof useTranslate>;

describe('useTranslate', () => {
  it('should be defined', () => {
    expect(useTranslate).toBeDefined();
  });

  it('with argument', () => {
    const initialProps: {
      ref: UseTranlateArgumentsType[0];
      options: UseTranlateArgumentsType[1];
    } = {
      ref: { current: document.body },
      options: { direction: 'row' },
    };

    const { result, rerender } = renderHook(
      ({ ref, options }) => useTranslate(ref, options),
      {
        initialProps,
      },
    );

    act(() => {
      result.current.run(100);
      expect(document.body.style.transform).toBe('translateX(-100px)');
      result.current.run(-200);
      expect(document.body.style.transform).toBe('translateX(--200px)');
    });

    initialProps.options.direction = 'column';
    rerender(initialProps);

    act(() => {
      result.current.run(100);
      expect(document.body.style.transform).toBe('translateY(-100px)');
      result.current.run(-100);
      expect(document.body.style.transform).toBe('translateY(--100px)');
    });
  });
});
