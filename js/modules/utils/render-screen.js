const renderScreen = (template) => {
  const container = document.querySelector(`main.central`);
  container.innerHTML = ``;
  container.appendChild(template);
};

export default renderScreen;
