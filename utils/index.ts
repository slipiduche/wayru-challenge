export const objectToArray = (assets: Object) => {
  let assetsArray = [];
  for (const key in assets) {
    assetsArray.push(assets[key]);
  }
  return assetsArray;
};
