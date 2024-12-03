import Block from '@core/block';
import Route from './route';

class Router {
    private static __instance: Router | null = null;  
    routes!: Route[];
    history!: History;
    _currentRoute!: Route | null;
    _rootQuery

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: string, BlockClass: new (props: any) => Block<any>) {
            
        const route = new Route(pathname, BlockClass, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this
    }
    //transition to a new path
    start() {
        
        window.onpopstate = event => {
            if(event.currentTarget instanceof Window)
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();

    }

    getRoute(pathname: string): Route {
        const route = this.routes.find(route => route.match(pathname));
        if (!route) {
            const errorRoute =  this.routes.find(route => route.match('/404'))
            if(errorRoute)return errorRoute
            throw new Error(`Route not found for pathname: ${pathname}`)
        }
        return route;
    }
}

export default Router;
