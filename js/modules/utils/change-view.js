const changeView = (element) => {
  const container = document.querySelector(`main.central`);
  container.innerHTML = ``;
  container.appendChild(element);
};

export default changeView;
