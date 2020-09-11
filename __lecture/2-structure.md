# 5.2.2 - Structure

---

- Redux is a global store for your state
- Even very large apps -> one big global-state object

---

When Redux was released, people were skeptical about this.

---

Redux makes this practical by letting you "combine reducers".

---

# Example state

```js
const state = {
  user: {
    name: "Bugs Bunny",
    species: "Wabbit",
  },
  orders: [
    {
      date: "01/02/03",
      items: ["carrot", "carrot", "carrot", "ACME powder"],
    },
  ],
};
```

Does this state look like 2 mini states?

---

What if we wrote two reducers?

```js
function userReducer(state, action) {
  switch (action.type) {
    case "LOG_IN": {
      return {
        name: action.name,
        species: action.species,
      };
    }

    default:
      return state;
  }
}

function orderReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      return {
        ...state,
        items: [...state.items, action.itemName],
      };
    }

    default:
      return state;
  }
}
```

---

Redux encourages this workflow by letting you **combine reducers**:

```js
import { combineReducers } from "redux";

import userReducer from "./user-reducer";
import orderReducer from "./order-reducer";

export default combineReducers({
  user: userReducer,
  order: orderReducer,
});
```

---

The `keys` that you pass to `combineReducers` become a branch of the state.

```js
// Using multiple reducers
function todos(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}
function counter(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
// Alternative: using one reducer for everything
function reducer(state = { todos: [], count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        todos: state.todos,
        count: state.count + 1,
      };
    case "ADD_TODO":
      return {
        count: state.count,
        todos: state.todos.concat([action.text]),
      };
    default:
      return state;
  }
}
createStore(reducer, initialState);
```

---

# Learn More

Another example and full details can be found in the documentation: https://redux.js.org/api/combinereducers

---

# Producing State

```js
function colorReducer(state) {
  return "red";
}

function numberReducer(state) {
  return 4;
}

export default combineReducers({
  color: colorReducer,
  number: numberReducer,
});

// What is the initial state?
```

---

```js
{
  color: 'red',
  number: 4,
}
```

---

## How it works

When you dispatch an action, it calls _all_ of your reducers.

If that action doesn't match, it returns the current state. No problem.

---

```js
function userReducer(state, action) {
  switch (action.type) {
    case "LOG_IN": {
      return {
        name: action.name,
        species: action.species,
      };
    }

    default:
      return state;
  }
}

// When `LOG_IN` is dispatched, it produces a new state.
// When `ADD_ITEM_TO_CART` is dispatched, it falls to the "default" case.
```

---

By splitting our code into reducers, we keep the code simple.

---

With practice, you'll learn how best to organize your Redux state.
