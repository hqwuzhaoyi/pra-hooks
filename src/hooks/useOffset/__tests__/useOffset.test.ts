import { act, renderHook } from '@testing-library/react-hooks';
import useOffset from '../index';
import translateEnv from './translateEnv'
import createTranslateBlockBeforeEach from './createTranslateBlockBeforeEach'
describe('useOffset', () => {
  it('should be defined', () => {
    expect(useOffset).toBeDefined();
  });
  translateEnv()
  createTranslateBlockBeforeEach()

  it('should work without no initial ', () => {
    const { result, rerender } = renderHook(() =>
      useOffset(document.getElementById('container') as HTMLElement),
    );
    expect(result.current.canForward).toBe(true)
    expect(result.current.canBackward).toBe(false)

    act(() => {
      result.current.handleForward()
    })
    expect((document.getElementById('container') as HTMLElement).style.transform).toBe('translateX(-400px)')
    expect(result.current.canForward).toBe(false)
    expect(result.current.canBackward).toBe(true)
    act(() => {
      result.current.handleBackward()
    })
    expect((document.getElementById('container') as HTMLElement).style.transform).toBe('translateX(-0px)')
    expect(result.current.canForward).toBe(true)
    expect(result.current.canBackward).toBe(false)
  })

  it('should work with canSwitch equal false', () => {
    const { result, rerender } = renderHook(() =>
      useOffset(document.getElementById('container') as HTMLElement, { canSwitch: false }),
    );
    expect(result.current.canForward).toBe(false)
    expect(result.current.canBackward).toBe(false)
  })

  it('should work with snapFrame equal false', () => {
    const { result, rerender } = renderHook(() =>
      useOffset(document.getElementById('container') as HTMLElement, { snapFrame: false }),
    );
    expect(result.current.canForward).toBe(true)
    expect(result.current.canBackward).toBe(false)

    act(() => {
      result.current.handleForward()
    })
    expect((document.getElementById('container') as HTMLElement).style.transform).toBe('translateX(-440px)')
    expect(result.current.canForward).toBe(false)
    expect(result.current.canBackward).toBe(true)
    act(() => {
      result.current.handleBackward()
    })
    expect((document.getElementById('container') as HTMLElement).style.transform).toBe('translateX(-0px)')
    expect(result.current.canForward).toBe(true)
    expect(result.current.canBackward).toBe(false)
  })
})
