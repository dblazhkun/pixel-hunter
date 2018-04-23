const calculateImgProportions = (img, maxWidth, maxHeight) => {
  const naturalWidth = img.naturalWidth;
  const naturalHeight = img.naturalHeight;
  if (naturalHeight > naturalWidth) {
    img.height = maxHeight;
    img.width = naturalWidth / (naturalHeight / maxHeight);
  }
  if (naturalWidth > naturalHeight) {
    img.width = maxWidth;
    img.height = naturalHeight / (naturalWidth / maxWidth);
  }
};

export default calculateImgProportions;
