import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Router  from '@utils/router';
import Store from '@core/store';


declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  interface Window {
    router: Router;
    store: Store
  }
}

Handlebars.registerHelper('eq', (arg1, arg2) => arg1 === arg2);
Handlebars.registerHelper('or', (arg1, arg2) => arg1 || arg2);

Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') {
    Handlebars.registerPartial(name, component);
  }
});


const router = new Router('#app');
window.router = router;

const store = new Store({
  storeUser: [],
  storeChats: [],
  storeMessages: []
})
window.store = store;

router.use('/', Pages.LoginPage )
.use('/sign-up', Pages.RegistrationPage)
.use('/messenger', Pages.MessengerPage)
.use('/settings', Pages.ProfilePage)
.use('/404', Pages.ErrorPage)
.use('/500', Pages.ErrorFixingPage)
.start();



export enum Page {
  login = "/",
  registration = "/sign-up",
  messenger = "/messenger",
  profile = "/settings",
  notFoundError = "/404",
  serverError = "/500",
}


