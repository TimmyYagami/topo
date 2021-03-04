export function throttle(fn, delay = 200) {
  let run = false;

  return function (this: any, ...args) {
    if (run) return;
    run = true;
    setTimeout(() => {
      run = false;
      fn.apply(this, args);
    }, delay);
  };
}

// export function useThrottle(fn, interval = 500) {
//   console.log(arguments);
//   let run = true;
//   return function () {
//     console.log(this, arguments);
//     if (!run) return;
//     run = false;
//     setTimeout(() => {
//       fn.apply(this, arguments);
//       run = true;
//     }, interval);
//   };
// }
