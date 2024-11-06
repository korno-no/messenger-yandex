import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { Router } from '@utils/router';
import Block, {BlockProps} from '@core/block';


declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  interface Window {
    router: Router;
  }
}

Handlebars.registerHelper('eq', (arg1, arg2) => arg1 === arg2);


Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') {
    Handlebars.registerPartial(name, component);
  }
});
const router = new Router('#app');
window.router = router;

//@ts-ignore
router.use('/', Pages.LoginPage )
//@ts-ignore
.use('/registration', Pages.RegistrationPage)
//@ts-ignore
.use('/messenger', Pages.MessengerPage)
//@ts-ignore
.use('/profile', Pages.ProfilePage)
//@ts-ignore
.use('/404', Pages.ErrorPage)
//@ts-ignore
.use('/500', Pages.ErrorFixingPage)
.start();


enum Page {
  login = "/",
  registration = "/registration",
  messenger = "/messenger",
  profile = "/profile",
  notFoundError = "/404",
  serverError = "/500",
}

