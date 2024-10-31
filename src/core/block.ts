import EventBus from "./event-bus";
import Handlebars from "handlebars";
import { v4 as makeUUID } from 'uuid';

type TEvents = Values<typeof Block.EVENTS>
type PropsWithChildren<T> = T & {  [key: string]: any | (Block<any> | Partial<T>)[]; };


type Events = {
    [key in keyof HTMLElementEventMap]?: (
        event: HTMLElementEventMap[key],
    ) => void;
};

export type BlockProps = {
    [key: string]: unknown;
    events?: Events;
};

export default class Block<T extends BlockProps = BlockProps> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    _meta = null;
    _id: string;
    children;
    lists;
    name: string;

    //private _eventbus;
    protected props: T;
    private eventBus: () => EventBus<TEvents>;

    constructor(propsWithChildren: PropsWithChildren<T>) {
        const eventBus = new EventBus<TEvents>();//init eventBus
        const { props, children, lists } = this._getChildrenAndProps(propsWithChildren); //pars children and props

        //create a proxy that allows events to be triggered
        this._id = makeUUID();
        this.props = this._makePropsProxy({ ...props, __id: this._id });
        this.children = children;
        this.lists = this._makePropsProxy(lists);

        this.name = '';
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);//init component
    }



    //live sicle of components 
    _registerEvents(eventBus: EventBus<TEvents>) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this)); // initialization
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this)); // when props have been updeted
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER); // call render method
    }

    // abstract method
    init() { }

    _componentDidMount() {
        //this.componentDidMount();

        Object.values(this.children).forEach((child: Block<any>) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(_oldProps: T) {
       
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(_oldProps: T, _newProps: T) {
        return true;
    }

    _getChildrenAndProps(propsAndChildren: PropsWithChildren<T>) {
        const children: Record<string, Block<any>> = {};
        const props: Partial<T> = {};
        const lists: Record<string, Block<any>[]> = {}

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } 
            else if(Array.isArray(value)){
                
                lists[key] = value;
            }
            else {
                props[key as keyof T] = value as T[keyof T];
            }
        });

        return { children, props, lists };
    }

    setProps = (nextProps: Partial<T> | Record<string, Block<any>[]>) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const templateString: string = this.render();// get template of component as string
        this.compile(templateString, { ...this.props })
        this._removeEvents();
        this._addEvents();
    }

    render(): string {
        return "";
    }

    getContent() {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    _makePropsProxy(props: Partial<T> | Record<string, Block<any>[]> ): T {
        // TODO change it into arrow function
        const self = this;

        return new Proxy(props as T, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: T, prop: string, value) {
                const oldTarget = { ...target };
                (target as any)[prop] = value; // Use type assertion to bypass TypeScript's restriction

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        if (this._id !== null) {
            element.setAttribute('data-id', this._id);
        }
        return element;
    }

    _addEvents() {
        const { events = {} } = this.props;
        (Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach(eventName => {
            this._element!.addEventListener(eventName, events[eventName] as EventListener);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;
        (Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach((event) => {
            this._element!.removeEventListener(event, events[event] as EventListener);
        });
    }
    compile(template: string, props: any) {
        const propsAndStubs: { [key: string]: any } = { ...props };// copy props 
        //create stubs
        Object.entries(this.children).forEach(([key, child]) => { 
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });
        Object.entries(this.lists).forEach(([key]) => { 
            propsAndStubs[key] = `<div data-id="${this._id}"></div>`
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement; 
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);//insert values
        

        //switch stubs back to html element
        Object.values(this.children).forEach(child => { 
            const content = child.getContent();
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (content && stub) {
                stub.replaceWith(content);
            }
        });
        
        let block = fragment.content.firstElementChild as HTMLElement;
        Object.entries(this.lists).forEach(([_key, child]) => { 
                const stub = fragment.content.querySelector( `[data-id="${this._id}"]`);
                if(!stub) {
                    return
                };
                const listContent = this._createDocumentElement('template') as HTMLTemplateElement; 
                (child as Array<{ getContent: () => any; } | null>)?.forEach((item) => {
                    if(item instanceof Block && item !== null){
                        const content = item.getContent();
                        if(content){
                            listContent.content.append(content);
                        }
                    }
                    else{
                        listContent.content.append(`${item}`);
                    }
                })
                if (listContent && stub) {
                    stub.replaceWith(listContent.content);
                    block = fragment.content as unknown as HTMLElement;
                }
        });
        //insert created elemnt into DOM
        this._element?.replaceWith(block);
        this._element = block as HTMLElement;
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}
