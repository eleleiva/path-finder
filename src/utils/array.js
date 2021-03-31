function removeFromArray(array, item) {
  return array.filter((arrayItem) => arrayItem.id !== item.id);
}

function calculatePath(item) {
  const path = [];
  let temp = item;

  path.push(temp);

  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  return path;
}

function getToCommonItem(array1, array2) {
  return array2.filter((item1) => !array1.includes(item1));
}

export { removeFromArray, calculatePath, getToCommonItem };
