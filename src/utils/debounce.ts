export function debounce(fn, time: 500) {
  let timer;
  return function (this: any, ...args) {
    clearInterval(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}
