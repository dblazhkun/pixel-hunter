const preloadImage = (url) => {
  let img = new Image();
  img.src = url;
};

export default (data) => {
  data.forEach((it) => {
    if (it.image) {
      preloadImage(it.image.src);
    } else if (it.images) {
      it.images.forEach((image) => {
        preloadImage(image.src);
      });
    }
  });
};
