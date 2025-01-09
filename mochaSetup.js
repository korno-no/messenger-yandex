import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const dom = new JSDOM('<body></body>', { url: 'http://localhost' });

global.window = dom.window;
global.document = dom.window.document;
global.Node = window.Node;
global.history = dom.window.history;
