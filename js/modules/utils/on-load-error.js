export default (error) => {
  const node = document.createElement(`div`);
  node.style = `width: 600px; margin: 0 auto; text-align: center; background-color: red;`;

  node.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, node);
};
