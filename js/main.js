import changeView from './modules/utils/change-view';
import renderIntro from './modules/game/intro';
import renderGreeting from './modules/game/greeting';
import renderRules from './modules/game/rules';

// changeView(renderIntro(renderGreeting));

const App = {
  start() {
    this.showIntro();
  },

  showIntro() {
    const element = renderIntro(() => {
      this.showGreeting();
    });
    changeView(element);
  },

  showGreeting() {
    const element = renderGreeting(() => {
      this.showRules();
    });
    changeView(element);
  },

  showRules() {
    const done = () => {
      console.log(`done`);
    };
    const back = () => {
      console.log(this.showIntro);
      this.showIntro();
    };
    const element = renderRules(done, back);
    changeView(element);
  }
};

App.start();
