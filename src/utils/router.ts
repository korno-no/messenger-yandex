import Block, {BlockProps} from '@core/block';

function isEqual(lhs: unknown, rhs: unknown): boolean {
    return lhs === rhs;
}

function render(query:string, block: Block) {
    const root = document.querySelector(query);
    const element = block.getContent()
    if(element && root){
        root.appendChild(element);
    }

    return root;
}

export class Route {
    _pathname;
    _blockClass: any ;
    _block: Block | null;
    _props
    constructor(pathname: string, view: any, props: BlockProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            if(this._block){
                render(this._props.rootQuery as string, this._block);
            }
            return;
        }

        this._block.show();
    }
}

export class Router {
    static __instance: Router;
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

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
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
            //TODO: if path is not exist stay on current page or get an error
            throw new Error(`Route not found for pathname: ${pathname}`)
        }
        return route;
    }
}
