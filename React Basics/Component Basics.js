//appends a JSX compiled element to the root of the DOM tree
ReactDOM.render(JSX, document.getElementById('root')) 

//a static component (stateless) can be as simple as
const JSX = <h1>Hello World!</h1>

//all JSX components must have one parent elements
//like this
const JSX = 
<div>
  <h1>Welcome to the REACTive Web!</h1>
  <p>learn more about React below</p>
  <ul>
    <li>React is not a framework library</li>
    <li>It allows for stateful components that can communicate with eachother</li>
    <li>It is a powerful free web development tool created and mantained by Facebook</li>
  </ul>
</div>

//How to comment --> {/* comment here */}
const commentComp = 
<div>
  <h1>How to comment?</h1>
    {/* this is a comment in JSX */}
</div>

//You can render components to DOM elements by id
const idComponet = (
  <div>
    <h1>Hello World</h1>
    <p>Renders to element with id of 'node'</p>
  </div>
);
const nodeElm = document.getElementById('node')
ReactDOM.render( idComponet, nodeElm)

//when setting an elements properties one must use cammel case
//setting a class
const noCasingComp = (
  // no longer can use <p>class='classy'</p> in JSX 
    <div className='myDiv'> 
    <h1>this div has a class!</h1>
  </div>
);

//for elements that do not have conntents such as hr and br as well as some input elements,
//you can close the tag in the first tag, this saves some time and makes it so you dont have to make a closing tag unless it is needed

const selfClosedComp = (
  <div>
    <h2>Using self closing tags!</h2> 
    <br />
    <input type='text' placeholder='Enter you favorite thing to do.' />
    <p>This cant be self closed because it has innerText</p>
    <hr />
  </div>
);

//stateless componenets are the very commonly used, they do not have a state, but can have their own functions
//a simple example of one
const StatelessComponent = function() {
  return (
    <div>
      <p>Hello I'm A Statless Componenet</p>
    </div>
  )
}

//this is how you create a componenet with state, 
//in this example it is a new class extended from the React.Component class that is provided with the react libray
class StatefullComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true //this state can be changed from within this component and detirmin diffrent things the component with do/behave like
    }
  }
  render() {
    return(
      <div>
        <h1>I can have a state</h1>
      </div>
    )
  }
};
