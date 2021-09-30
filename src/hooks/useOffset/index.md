---
title: useOffset
nav:
  title: hook
group:
  title: useOffset
---

自动计算组件宽度，使其可以偏移

在有 children 的 节点上，计算出每个 child 的宽度，可在超出宽度使其滑动时使用。

## 横向滚动

<code src="./examples/index.tsx"></code>

## 竖向滚动

<!-- <code src="./examples/column.tsx"></code> -->

## API

### Params

| Name    | Description                        | Type                                                     | Default |
| ------- | ---------------------------------- | -------------------------------------------------------- | ------- |
| ref     | DOM 节点或者 Refs                  | `HTMLElement \| (() => HTMLElement) \| MutableRefObject` | `--`    |
| options | 配置偏移的行为，详见下面的 Options | `Options`                                                | `{}`    |

### Options

| Name       | Description            | Type                | Default |
| ---------- | ---------------------- | ------------------- | ------- |
| canSwitch  | 能否超出显示切换按钮   | `boolean`           | `false` |
| snapFrame  | 切换时贴住子元素的左边 | `boolean`           | `false` |
| wheelEvent | 滚动事件               | `boolean`           | `false` |
| direction  | 水平滚动还是水平滚动   | `'row' \| 'column'` | `row`   |
