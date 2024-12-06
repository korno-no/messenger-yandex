import EventBus from "./event-bus.ts";

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  [key: string]: any;
}

class Store extends EventBus<StoreEvents> {
  
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }
  
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

