import {isObj, isVal} from "../core/types";
import View from "./view";


export function Store(reducer) {
    var state = reducer(undefined, {});
    var listeners = [];

    if (!isVal(state)) throw TypeError('Store: Initial state is null or undefined,' +
        ' reducer does not return properly on random/empty state');

    this.subscribe = function (callback) {
        listeners.push(callback);
    }

    this.unsubscribe = function (callback) {
        listeners.splice(listeners.indexOf(callback), 1);
    }

    this.getState = function () {
        return state;
    }

    this.dispatch = function (action) {
        state = reducer(state, action)
        listeners.forEach((callback)=>{
            setTimeout(callback, 1, state, action);
        })
    }

}
export function createStore(reducer) {
    return new Store(reducer);
}
export function createGlobalStore(reducer) {
    View.prototype.$store = createStore(reducer);
}

export function setGlobalStore(store) {
    View.prototype.$store = store;
}