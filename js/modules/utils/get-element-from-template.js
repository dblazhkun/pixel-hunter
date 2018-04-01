const getElementFromTemplate = (templateString) => {
  const div = document.createElement(`div`);
  div.innerHTML = templateString;
  return div;
};

export default getElementFromTemplate;
