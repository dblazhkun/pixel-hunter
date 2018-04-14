import changeView from './modules/utils/change-view';
import renderIntro from './modules/game/intro';
import renderGreeting from './modules/game/greeting';

changeView(renderIntro(renderGreeting));
