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


//components can be nested as much as desired/needed
//this is a simple nested component
const ChildComp = () => {
  return (
    <div>
      <p>stateless child</p>
    </div>
  );
};

//child/parent components dont need to be stateful or statless, either will work
class ParentComp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>statefull parent component</h1>
        <ChildComponent />
      </div>
    );
  }
};


//React is all about breaking down complex UI into small digestiable chunks, 
//this is an example of a list of Cameras, it can be expanded by creating more sub-components

//two lists that are simple functional componets
const CanonCameras = () => {
  return (
    <div>
      <h3>Cannon Cameras:</h3>
      <ul>
        <li>EOS 5D Mark IV</li>
        <li>EOS Rebel T7</li>
        <li>EOS R5</li>
      </ul>
    </div>
  );
};

const NikonCameras = () => {
  return (
    <div>
      <h3>Nikon Cameras:</h3>
      <ul>
        <li>D850</li>
        <li>Z50</li>
        <li>D3500</li>
      </ul>
    </div>
  );
};

//brings the seperate list of cameras brand to one component
const Cameras = () => {
  return (
    <div>
      <h2>Types of Cameras:</h2>
      <CanonCameras />
      <NikonCameras />
    </div>
  );
};
//a list of tech products that can be expanded upon to include more teach feilds
class TechLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Teach Products</h1>
        <Cameras />
      </div>
    );
  }
};

//to use ReactDOM.render() with react components a diffrent syntax is need then when rendering a simple JSX var

//rendering the Techlist Comp. to the root node would use
const rootNode = document.getElementById('root');
ReactDOM.render(<TechLists />, rootNode);

//passing a simple values to a stateless component via 'props'
const CurrentDate = (props) => {
  return (
    <div>
      <p>The current date is: {props.date} </p>
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        <CurrentDate date={Date()}/>
      </div>
    );
  }
};

//you can pass default props to a stateless component with the following
CurrentDate.defaultProps = {date: 'Date not accessable'};

//when rendering a component you can overide a default prop by setting it explicity
//exampled here
const CurrentDate = (props) => { //component with default props
  return (
    <div>
      <p>The current date is: {props.date} </p>
    </div>
  );
};
//setting a default prop
CurrentDate.defaultProps = {date: 'Date not accessable'};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        {/* setting the prop explicity overides the default */}
        <CurrentDate date={Date()}/>
      </div>
    );
  }
};

//if you want know what type of data a prop is going to be it is best practice to require that prop be a certian type. 
//it will not stop the application from running but give useful warnings in development that can help debuging greatly
//the practice is used as follows
ComponentName.propTypes = {
  prop1: PropTypes.array.isRequired, //prop 1 must now be an array or a warning will appear
  prop2: PropTypes.string.isRequired //prop 2 must be a string
};

//to use props in a class component you must use this.props, like this
class useProps extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>
          {this.props.key} //use prop values like this
        </h1>
      </div>
    );
  }
};

//for a react component to be stateful it must have a 'state' property, which is defined in the contructor
//basic example
class Stateful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prop: "this is the default value of a component's state's property",
      name: 'John Doe',
      age: 25,
      admin: false
    }
  }
  //one way to render the value of 'prop' is to access this.state, then access .prop. 
  //this is exampled below

  // a better way when dealing with many state props. is to use obj. destructuring.
  // this can be done in the component render method, but not in the return code (which is JSX)
  
  render() {
  
    const {name, age, admin} = this.state;
  
    return (
      <div>
        <h1>
          {this.state.prop}
        </h1>
        <p>
          Name: {name}
        </p>
        <p>
          Age: {age}
        </p>
        <p>
          Are you an admin: {!admin ? 'No' : 'Yes'}
        </p>
      </div>
    );
  }
};

//binding a event function to a component element

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Not yet clicked"
    };
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        
        <button 
        onClick={this.handleClick.bind(this)}
        >
          Click Me
        </button>
        
        <h1>{this.state.text}</h1>
      </div>
    );
  }
};


