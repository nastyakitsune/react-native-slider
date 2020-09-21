export const fillArray = (count) =>
  Array(count)
    .fill(0)
    .map((_, i) => i);

export const sortArray = (a, b) => (b.category > a.category ? -1 : 1);

export const uniqArray = (v, i, a) => a.indexOf(v) === i;
