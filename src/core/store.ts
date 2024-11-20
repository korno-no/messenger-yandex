import EventBus from "./event-bus";

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  [key: string]: any;
}

class Store extends EventBus<StoreEvents> {
  
  private state: State = {};

  constructor(defaultState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  // ??removeStste()??

  public getState(): State {
    return this.state;
  }
  public set(nextState: State) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };
    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

export default Store;

