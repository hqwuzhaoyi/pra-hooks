export default () => {
  beforeEach(() => {
    // set up a DOM element as a render target
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.style.overflow = 'hidden'
    container.style.width = '120px'

    const dataSource: Record<string, any>[] = [
      { width: 100, height: 100, backgroundColor: 'yellow' },
      { width: 100, height: 100, backgroundColor: 'red' },
      { width: 100, height: 100, backgroundColor: 'blue' },
      { width: 200, height: 100, backgroundColor: 'pink' },
    ];

    dataSource.forEach((item) => {
      const newItem = document.createElement('div');
      newItem.style.width = item.width + 'px';
      newItem.style.height = item.height + 'px';
      newItem.style.backgroundColor = item.backgroundColor;
      container.appendChild(newItem);
    });
    document.body.appendChild(container);
  });
  afterEach(() => {
    const container = document.getElementById('container') as HTMLElement;
    container.remove();
  })
}
