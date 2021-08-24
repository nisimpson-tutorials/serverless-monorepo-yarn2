import toUpper from 'lodash/toUpper';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export const hello = (value: string) => {
  return toUpper(`hello, ${value}`);
}
