import React, { useRef, useMemo, useCallback, useLayoutEffect } from 'react';
import styles from './index.less';
import { isNumeric } from './utils';
import useBackforth from '@hqwuzhaoyi/use-backforth';
import classnames from 'classnames';
import { useThrottleFn } from 'ahooks';

interface CarouselProps {
  dataSource: string[];
  width?: number | string;
  height?: number | string;
  easing?: string;
  during?: number;
}

const isCriticalPoint = (arrLen: any[], curIndex: number) => {
  if (curIndex === 0 || curIndex === arrLen.length - 1) return true;
  return false;
};

const Carousel: React.FC<CarouselProps> = ({
  dataSource: rawDataSource,
  width: rawWidth = 200,
  height: rawHeight = 150,
  easing = 'linear',
  during = 300,
}) => {
  // * 首次加载
  const mountRef = useRef(false);
  // * 开启动画
  const transitionRef = useRef(false);
  // * 当前下标
  const currentIndex = useRef(0);
  // * transition 绑定的 DOM元素
  const ref = useRef<HTMLDivElement>(null);

  const { handleForward, canForward, canBackward, handleBackward, redirect } =
    useBackforth(ref, {
      snapFrame: false,
      wheelEvent: true,
      direction: 'row',
      canSwitch: true,
    });

  const { run } = useThrottleFn(
    (callback) => {
      callback();
    },
    { wait: during },
  );

  // 在原先基础上头尾各增加一个，如1,2,3变为3,1,2,3,1
  const dataSource = useMemo(() => {
    return [
      rawDataSource[rawDataSource.length - 1],
      ...rawDataSource,
      rawDataSource[0],
    ];
  }, [rawDataSource]);

  const propsStyle = useMemo(() => {
    const width = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
    const height = isNumeric(rawHeight) ? `${rawHeight}px` : String(rawHeight);
    return { width, height };
  }, [rawWidth, rawHeight]);

  useLayoutEffect(() => {
    if (mountRef.current === false && canForward) {
      handleForward();
      currentIndex.current = 1;
      mountRef.current = true;
    }
  }, [canForward]);

  const handleLeft = useCallback(() => {
    const targetIndex = currentIndex.current - 1;
    handleBackward();
    currentIndex.current = targetIndex;
    transitionRef.current = true;
    if (targetIndex === 0) {
      setTimeout(() => {
        transitionRef.current = false;
        redirect(dataSource.length - 2);
      }, during + 100);
      currentIndex.current = dataSource.length - 2;
    }
  }, [currentIndex.current, handleBackward, redirect]);

  const handleRight = useCallback(() => {
    const targetIndex = currentIndex.current + 1;
    if (targetIndex >= dataSource.length) return;
    handleForward();
    currentIndex.current = targetIndex;
    transitionRef.current = true;

    if (targetIndex === dataSource.length - 1) {
      setTimeout(() => {
        transitionRef.current = false;
        redirect(1);
      }, during + 100);
      currentIndex.current = 1;
    }
  }, [currentIndex.current, handleForward, redirect]);

  const transitionStyle = useMemo(
    () => ({
      transition: 'transform ' + during + 'ms ' + easing,
      WebkitTransition: 'transform ' + during + 'ms ' + easing,
    }),
    [during, easing],
  );

  const bodyStyle = useMemo(() => {
    if (transitionRef.current === false) {
      return {};
    }
    transitionRef.current = false;
    return { ...transitionStyle };
  }, [transitionRef.current, transitionStyle]);

  return (
    <div className={styles.carouselContainer} style={propsStyle}>
      <div style={bodyStyle} className={styles.carouselBody} ref={ref}>
        {dataSource.map((src, index) => (
          <div key={src + index}>
            <img
              src={src}
              width={propsStyle.width}
              height={propsStyle.height}
            />
          </div>
        ))}
      </div>

      <button
        className={classnames(styles.carouselButton, styles.left)}
        onClick={() => run(handleLeft)}
      >
        left
      </button>

      <button
        className={classnames(styles.carouselButton, styles.right)}
        onClick={() => run(handleRight)}
      >
        right
      </button>
    </div>
  );
};

export default Carousel;
