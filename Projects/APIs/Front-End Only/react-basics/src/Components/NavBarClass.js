import React, { Component } from 'react' 
//React is need anytime we use JSX
// Component is a class that will be the parent class for any React Custom component we make

export default class NavBar extends Component {
  
  constructor(prop) {
    super(prop)
    this.state = {
      count: 0,
      ...prop.state
    }
    this.counterUp = this.counterUp.bind(this)
    this.counterDown = this.counterDown.bind(this)
    this.counterReset = this.counterReset.bind(this)

  }

  counterUp() {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }))
  }

  counterDown() {
    this.setState((prevState) => ({ count: prevState.count - 1 }))
  }
  counterReset() {
    this.setState(() => ({ count: 0 }))
  }
  render() {

    const currentCount =this.state.count;

    return (
      <div>
        <h1>
          {`The Count is ${currentCount}`}
        </h1>
        <button
          onClick={this.counterUp}
        >
          +1
        </button>
      
        <button
          onClick={this.counterDown}
        >
          -1
        </button>
      
        <button
          onClick={this.counterReset}
        >
          Reset
        </button>
      </div>
    )
  }
}
