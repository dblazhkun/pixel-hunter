import changeView from './modules/utils/change-view';
import IntroView from './modules/game/intro-view';
import GreetingView from './modules/game/greeting-view';
import RulesView from './modules/game/rules-view';
import HeaderView from './modules/game/header-view';
import ResultsView from './modules/game/results-view';
import GamePresenter from './modules/game/game-presenter';
import Loader from './modules/utils/loader';
import onLoadError from './modules/utils/on-load-error';
import preloadDataImages from './modules/utils/preload-data-images';

const App = {
  start() {
    this.showIntro();
  },

  showIntro() {
    const intro = new IntroView();
    changeView([intro.element]);

    this.introNode = intro;

    Loader.loadData().
        then((data) => {
          App.cachedData = data;
          preloadDataImages(data);
        }).
        then(() => {
          App.introNode.animate();
          setTimeout(() => {
            App.showGreeting();
          }, 350);
        }).
        catch(onLoadError);
  },

  showGreeting() {
    const onAction = () => {
      this.showRules();
    };

    const greeting = new GreetingView(onAction);
    changeView([greeting.element]);

    setTimeout(() => {
      greeting.animate();
    }, 10);

  },

  onBack() {
    App.showGreeting();
  },

  showRules() {
    const onStartGame = (playerName) => {
      this.showGame(playerName, this.cachedData);
    };

    const header = new HeaderView({onBack: this.onBack.bind(this)});
    const rules = new RulesView(onStartGame);

    changeView([header.element, rules.element]);
  },

  showGame(playerName, data) {
    const game = new GamePresenter({
      playerName,
      levels: data,
      onBack: this.onBack.bind(this),
      showResults: this.synchResultsWithServer.bind(this)
    });

    game.start();
  },

  synchResultsWithServer({state, answers, playerName}) {
    const data = {
      state,
      answers
    };

    Loader.saveResults(data, playerName).
        then(() => Loader.loadResults(playerName)).
        then((serverData) => {
          App.showResults(serverData, App.onBack);
        }).
        catch(onLoadError);
  },

  showResults(data, onBack) {
    const header = new HeaderView({onBack});
    const results = new ResultsView(data);

    changeView([header.element, results.element]);
  }
};

App.start();
