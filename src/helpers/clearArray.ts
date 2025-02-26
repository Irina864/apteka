export function clearArray<T>(arrays: T[][]): T[] {
  return [...new Set(arrays.flat())].filter((item) => item !== '');
}
