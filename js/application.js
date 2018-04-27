import changeView from './modules/utils/change-view';
import IntroView from './modules/game/intro-view';
import GreetingView from './modules/game/greeting-view';
import RulesView from './modules/game/rules-view';
import HeaderView from './modules/game/header-view';
import GameModel from './data/game-model';
// import GamePresenter from './modules/game/game-presrenter';


export default class Application {

  static showIntro() {
    const onAction = () => {
      this.showGreeting();
    };

    const intro = new IntroView(onAction);
    changeView([intro.element]);
  }

  static showGreeting() {
    const onAction = () => {
      this.showRules();
    };

    const greeting = new GreetingView(onAction);
    changeView([greeting.element]);
  }

  static showRules() {
    const onBack = () => {
      this.showIntro();
    };
    const startGame = (playerName) => {
      this.showGame(playerName);
    };

    const header = new HeaderView({onBack});
    const rules = new RulesView(startGame);

    changeView([header.element, rules.element]);
  }

  static showGame(playerName) {
    const gameScreen = new GamePresenter(new GameModel(playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  // static showStats(model) {
  //   const statistics = new StatsScreen(model);
  //   changeView(statistics.element);
  // }

}
