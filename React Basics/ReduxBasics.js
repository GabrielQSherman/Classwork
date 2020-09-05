/*
Redux is the most popular store management for React. 
The 'store' is how Redux will store the state of the application which is all the states from all compoents combine into one
Using the Redux method createStore the storage for redux is created and can be used by React components
*/

const reducer = (state = 5) => {
    return state;
  }

const store = Redux.createStore(reducer)

//Using React getState
const store = Redux.createStore(
    (state = 5) => state
);

/*
Once a Redux store is assigned to a var a getState method can be called

Using the getState method you can retrieve the current state of the applicaition
*/
  
const currentState = store.getState()

//Defining a Redux action

/* 
In Redux in order to update the state of an applicaiton (update the store)
You must dispatch actions 
This is how you can define a action with Redux
*/

//this simple action only has a type defined and will be identifed as 'LOGIN'
const action = {
    type: 'LOGIN'
  }
  
//it is best practice to have all actions be return to the dispatch method with an action creator, this will return the action object

//this one is simply called actionCreator
const actionCreator = () => {
  return action
}
  
//once the action creator is defined it can be passed to the store through the dispatch method
store.dispatch(actionCreator())

//a reducer is a function with a very simple purpose. It takes a state and an action an returns an updated state. 
//Because best practice with Redux calls for states to be 'read only' a reducer returns the state without directly modifying the state object passed to the funciton
const defaultState = {
  login: false
};

//using a switch statement here is ideal when you have more than one possible action which will always be the case
const reducer = (state = defaultState, action) => {
  const newState = {...state}
  switch(action.type) {
    case 'LOGIN':
      newState.login = true
  }
  return newState
};

//this is an example of using the switch statment for multiple possible actions
const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
 switch (action.type) {
    case "LOGIN":
      return {
        authenticated: true
      };

    case "LOGOUT":
      return {
        authenticated: false
      };

    default:
      return defaultState;
 }
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};

//types should be defined as const so they are read-only once set, that can be read from the same file as the reducer or imported from another
//here is how the actions for the example above would be defined
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
//also note that the all the string literals in the example above would be replaced by the const vars

//how to use Redux.store subscribe method 

const ADD = 'ADD'; //define the actions time

const reducer = (state = 0, action) => { //create reducer for the actions defined above
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer); //create the store, attach reducer

let count = 0;

const addOne = () => (count += 1); //function will be tied to the dipatch event
//this will attach the event listener dispatch to the addOne function so cound increases every time an action is dipatched
store.subscribe(addOne)

store.dispatch({type: ADD});
//count now equals 1, also the store could be accessed this way too


//it is common once you have more than one component with seperate reducers that you combine the reducers, there is a handy function that will allow devs to do this
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};
//Now that the counterReducer is defined it will be combined with the auth reducer so one reducer is used to create the Redux store
const rootReducer = Redux.combineReducers({
  auth: authReducer,
  count: counterReducer
  }
)// define the root reducer here

const store = Redux.createStore(rootReducer);
