/*
Redux is the most popular store management for React. 
The 'store' is how Redux will store the state of the application which is all the states from all compoents combine into one
Using the Redux method createStore the storage for redux is created and can be used by React components
*/

const reducer = (state = 5) => {
    return state;
  }

const store = Redux.createStore(reducer)