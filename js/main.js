import changeView from './modules/utils/change-view';
import countAnswer from './modules/utils/count-answer';
import getAnswerRating from './modules/utils/get-answer-rating';
// import renderResults from './modules/game/results';
import {INITIAL_GAME, INITIAL_ANSWERS, LEVELS} from './data/data';
import IntroView from './modules/game/intro-view';
import GreetingView from './modules/game/greeting-view';
import RulesView from './modules/game/rules-view';
import HeaderView from './modules/game/header-view';
import Level1View from './modules/game/level-1-view';
import Level2View from './modules/game/level-2-view';
import Level3View from './modules/game/level-3-view';
import StatsView from './modules/game/stats-view';
import checkGameAnswer from './modules/utils/check-game-answer';


const App = {
  start() {
    this.showIntro();
  },

  showIntro() {
    const onAction = () => {
      this.showGreeting();
    };

    const intro = new IntroView(onAction);
    changeView([intro.element]);
  },

  backToIntro() {
    this.showIntro();
  },

  showGreeting() {
    const onAction = () => {
      this.showRules();
    };

    const greeting = new GreetingView(onAction);
    changeView([greeting.element]);
  },

  showRules() {
    const onBack = () => {
      this.showIntro();
    };
    const startGame = (playerName) => {
      this.showGame(playerName);
    };

    const header = new HeaderView({onBack});
    const rules = new RulesView(startGame);

    changeView([header.element, rules.element]);
  },

  showLevel({state, levels, answers}) {
    const level = levels[this.currentLevel];
    switch (level.gameType) {
      case 1:
        this.renderLevel1({level, state, answers});
        break;
      case 2:
        this.renderLevel2({level, state, answers});
        break;
      case 3:
        this.renderLevel3({level, state, answers});
        break;
    }
  },

  renderLevel1({level, state, answers}) {
    const onBack = () => {
      this.showIntro();
    };
    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };
    const headerView = new HeaderView({state, onBack, time: 30});
    const levelView = new Level1View({level, onAnswer, onBack});
    const statsView = new StatsView(answers);

    changeView([headerView.element, levelView.element, statsView.element]);
  },

  renderLevel2({level, state, answers}) {
    const onBack = () => {
      this.showIntro();
    };
    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };
    const headerView = new HeaderView({state, onBack, time: 30});
    const levelView = new Level2View({level, onAnswer, onBack});
    const statsView = new StatsView(answers);

    changeView([headerView.element, levelView.element, statsView.element]);
  },

  renderLevel3({level, state, answers}) {
    const onBack = () => {
      this.showIntro();
    };
    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };
    const headerView = new HeaderView({state, onBack, time: 30});
    const levelView = new Level3View({level, onAnswer, onBack});
    const statsView = new StatsView(answers);

    changeView([headerView.element, levelView.element, statsView.element]);
  },

  countAnswer(isCorrect) {
    this.state = countAnswer(this.state, isCorrect, 15);

    if (isCorrect) {
      this.answers[this.currentLevel] = getAnswerRating(15);
    } else {
      this.answers[this.currentLevel] = getAnswerRating();
    }

    if (this.state.isGameEnd) {
      this.showResults({
        state: this.state,
        answers: this.answers,
        back: this.showGreeting
      });
    } else {
      this.currentLevel++;

      this.showLevel({
        state: this.state,
        levels: this.levels,
        answers: this.answers,
      });
    }
  },

  showResults({state, answers, back}) {
    const element = renderResults({state, answers, back});
    changeView(element);
  },

  startGame() {
    this.state = JSON.parse(JSON.stringify(INITIAL_GAME));
    this.levels = JSON.parse(JSON.stringify(LEVELS));
    this.answers = INITIAL_ANSWERS.slice(0);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
    });
  },

  handleLevelWin() {
    this.answers[this.currentLevel] = getAnswerRating(15);
    this.state = countAnswer(this.state, true, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
    });
  },

  handleLevelFail() {
    this.answers[this.currentLevel] = getAnswerRating();
    this.state = countAnswer(this.state, false, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
    });
  },

  handleGameWin(lastAnswerStatus = false) {
    if (lastAnswerStatus) {
      this.answers[this.currentLevel] = getAnswerRating(15);
      this.state = countAnswer(this.state, true, 15);
    } else {
      this.answers[this.currentLevel] = getAnswerRating();
      this.state = countAnswer(this.state, false, 15);
    }
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showResults({
      state: this.state,
      answers: this.answers,
      back: this.backToIntro.bind(this)
    });
  },

  handleGameLose() {
    this.answers[this.currentLevel] = getAnswerRating();
    this.state = countAnswer(this.state, false, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showResults({
      state: this.state,
      answers: this.answers,
      back: this.backToIntro.bind(this)
    });
  }
};

App.start();
