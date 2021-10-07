---
title: useBackforth
nav:
  path: /Hooks
  title: Hooks
group:
  title: useBackforth
---

提供 DOM 元素左右滑动能力的 Hook.

核心特性

- 窗口响应更新
- 提供是否可以左右滑动
- 自动贴边
- ~~横向或者竖向滑动~~
- ~~支持滚轮滑动~~

## 横向滚动

<code src="./src/demo/index.tsx"></code>

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
