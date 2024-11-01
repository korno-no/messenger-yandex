import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

const pages = {
  login: [Pages.LoginPage],
  nav: [Pages.NavigatePage],
  registration: [Pages.RegistrationPage],
  messenger: [Pages.MessengerPage],
  profile: [Pages.ProfilePage],
  404: [Pages.ErrorPage],
  500: [Pages.ErrorFixingPage],
};

Object.entries(Components).forEach(([name, component]) => {
  if (typeof component === 'string') {
    Handlebars.registerPartial(name, component);
  }
});

function navigate(page: string) {
  // @ts-ignore
  const [Source, context] = pages[page];
  const container = document.getElementById('app')!;

  if (Source instanceof Object) {
    const newPage = new Source(context);
    container.innerHTML = '';
    container.append(newPage.getContent());
    // page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(Source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
  // @ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

Handlebars.registerHelper('eq', (arg1, arg2) => arg1 === arg2);
