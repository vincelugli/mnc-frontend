import { createStore } from 'redux';
import "regenerator-runtime/runtime";

// reducer
const countReducer = function (state = 0, action: {type: string}) {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
};

export const store = createStore(countReducer);