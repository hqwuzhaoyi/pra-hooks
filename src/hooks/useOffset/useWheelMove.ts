export default function useWheelMove(
  ref: React.RefObject<HTMLDivElement>,
  childrenWidth,
  currentX,
  { canSwitch },
) {
  // * 滚动
  const WheelMoveRef = (event: {
    preventDefault: () => void;
    deltaY: number;
  }) => {
    event.preventDefault();
    // console.log(event.deltaY)
    // console.log(size.width);

    const targetX = event.deltaY + translateX;
    const noMax = targetX + (size.width || 0) <= childrenWidth;
    const noMin = targetX > 0;
    console.log(targetX);
    if (noMax || noMin) {
      // console.log(totalWidth)
      MoveXRef(targetX);
      setTranslateX(targetX);
    }
    // console.log(translateX)
    // console.log('+++s' + (translateX + event.deltaY))
    // if(translateX + event.deltaY >= )
    // MoveXRef(translateX + size.width)
    // setTranslateX(translateX + event.deltaY)
    // box.scrollLeft += event.deltaY
  };

  useEffect(() => {
    if (ref.current && canSwitch)
      ref.current.addEventListener('wheel', WheelMoveRef);
  }, [WheelMoveRef]);
}
