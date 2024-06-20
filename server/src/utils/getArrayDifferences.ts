function getArrayDifferences<T>(
  oldArray: T[],
  newArray: T[],
): { deletedItems: T[]; addedItems: T[] } {
  const oldSet = new Set(oldArray);
  const newSet = new Set(newArray);

  const deletedItems = oldArray.filter((item) => !newSet.has(item));
  const addedItems = newArray.filter((item) => !oldSet.has(item));

  return {
    deletedItems,
    addedItems,
  };
}

export default getArrayDifferences;
