import React, { useRef, useLayoutEffect } from 'react';
import styles from './index.less';
import { isNumeric } from './utils';
import useBackforth from '@hqwuzhaoyi/use-backforth';
import classnames from 'classnames';

interface CarouselProps {
  dataSource: string[];
  width?: number | string;
  height?: number | string;
}

const Carousel: React.FC<CarouselProps> = ({
  dataSource,
  width: rawWidth = 200,
  height: rawHeight = 150,
}) => {
  const width = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
  const height = isNumeric(rawHeight) ? `${rawHeight}px` : String(rawHeight);
  const propsStyle = { width, height };
  const currentIndex = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const { handleForward, canForward, canBackward, handleBackward, redirect } =
    useBackforth(ref, {
      snapFrame: false,
      wheelEvent: true,
      direction: 'row',
      canSwitch: true,
    });

  console.log(redirect);

  const handleLeft = () => {
    const targetIndex = currentIndex.current - 1;
    if (targetIndex === -1) {
      redirect(dataSource.length - 1);
      currentIndex.current = dataSource.length - 1;
      return;
    }
    handleBackward();
    currentIndex.current = targetIndex;
  };
  const handleRight = () => {
    const targetIndex = currentIndex.current + 1;
    if (targetIndex === dataSource.length) {
      redirect(0);
      currentIndex.current = 0;
      return;
    }
    handleForward();
    currentIndex.current = targetIndex;
  };
  return (
    <div className={styles.carouselContainer} style={propsStyle}>
      <div className={styles.carouselBody} ref={ref}>
        {dataSource.map((src) => (
          <div>
            <img src={src} width={width} height={height} />
          </div>
        ))}
      </div>
      <button
        className={classnames(styles.carouselButton, styles.left)}
        onClick={handleLeft}
      >
        left
      </button>
      <button
        className={classnames(styles.carouselButton, styles.right)}
        onClick={handleRight}
      >
        right
      </button>
    </div>
  );
};

export default Carousel;
