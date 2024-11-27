import Block, {BlockProps} from '@core/block';

function isEqual(lhs: unknown, rhs: unknown): boolean {
    return lhs === rhs;
}

function render(query:string, block: Block) {
    const root = document.querySelector(query);
    const element = block.getContent()
    if(element && root){
        root.append(element);
    }

    return root;
}

class Route {
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
export default Route;
