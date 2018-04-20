const changeView = (elements) => {
  const container = document.querySelector(`main.central`);
  const fragment = document.createDocumentFragment();

  elements.forEach((it) => fragment.appendChild(it));
  container.innerHTML = ``;
  container.appendChild(fragment);
};

export default changeView;
