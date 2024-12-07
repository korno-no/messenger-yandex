import Block from "./block.ts";
import {  StoreEvents }  from "./store.ts";
import isEqual from "../utils/isEqual.ts";

type Indexed<T = any> = {
    [key in string]: T;
};

export default function connect(mapStateToProps: (state: Indexed) => Indexed){
    return function(Component: typeof Block) {
        return class extends Component {
            constructor(props={}){

                // initial state
                let state = mapStateToProps(window.store.getState());

                super({...props, ...state,});
                
                window.store.on(StoreEvents.Updated, () => {
                    // getting new state
                    const newState = mapStateToProps(window.store.getState());
                    // check if something have been changed
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }
                    // save new state
                    state = newState;
                });
            }
        }
    }
}
