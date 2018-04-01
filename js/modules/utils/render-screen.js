const renderScreen = (template) => {
  const container = document.querySelector(`main.central`);
  container.innerHTML = ``;
  container.appendChild(template.cloneNode(true));
};

export default renderScreen;
