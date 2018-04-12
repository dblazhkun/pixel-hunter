import {createElement} from '../utils/create-element';

export default (state) => {
  const template = `<div class="stats">
    <ul class="stats">
      ${state.answers.map((it) => `<li class="stats__result stats__result--${it}"></li>`).join(``)}
    </ul>
  </div>`;

  return createElement(template);
};
