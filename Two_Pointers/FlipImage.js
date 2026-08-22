var flipAndInvertImage = function (image) {
  for (const row of image) {
    let left = 0;
    let right = row.length - 1;

    while (left < right) {
      const temp = 1 - row[left];
      row[left] = 1 - row[right];
      row[right] = temp;
      left++;
      right--;
    }

    if (left === right) {
      row[left] = 1 - row[left];
    }
  }

  return image;
};
