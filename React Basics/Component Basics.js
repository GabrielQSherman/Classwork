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

//how to bind functions properly when using setState()
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    //bind functions in the constructor
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  //simple toggle of the visibility state prop
  toggleVisibility() {
    this.setState( state => ({
      visibility: !state.visibility
    }))
  }

  render() {
      const visibility = this.state.visibility===true;
      return (
        <div>
          <button onClick={this.toggleVisibility}>
            gives a diffrent text for the button depending on a state's property value
            { 
                visibility 
                ? 'Click To Hide' 
                : 'Click To Reveal'
            }
          </button>
          {/* only shows when the visibility property is true */}
          { visibility && <h1>You see me!?!?!</h1> }
        </div>
      );
    }
};

//Simple Counter Example, shows binding in the constructor and how to use the setState method
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }
  increment() {
    this.setState( state => ({
      count: state.count + 1
    }))
  }
  decrement() {
    this.setState( state => ({
      count: state.count - 1
    }))
  }
  reset() {
    this.setState( state => ({
      count: 0
    }))
  }
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};

//example of a React controled input
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    const newInput = e.target.value;
    this.setState( state => ({
      input: newInput
    }))
  }
  render() {
    return (
      <div>
        <input 
          value={this.state.input}
          onChange={this.handleChange}
        />
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};

//how to create a form and implelment submit
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState( (state) => ({
      submit: state.input
    }));

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit!</button>
        </form>
        <h1>{this.state.submit}</h1>
        
      </div>
    );
  }
};

//how to pass pass props to a JSX component from a state class component
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Gabriel'
    }
  }
  render() {
    return (
       <div>
         {/* the passing of state to prop */}
         <Navbar name={this.state.name}/>
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      {/* use of prop that came from state */}
      <h1>Hello, my name is: {this.props.name} </h1>
    </div>
    );
  }
};

//One can also pass functions to a child component allowing a child component to interact with the state of a parent without being stateful
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
        <GetInput handleChange={this.handleChange} />
        <RenderInput input={this.state.inputValue}/>
        
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};

/* 
COMPONENT LIFECYCLE METHODS
  componentWillMount() 

    This method will fire before the render method

  componentDidMount() 

    This method fires only after the component mounts to the parent component
    This is also where you should call API request

  componentWillUnmount()


  shouldComponentUpdate() 
  componentDidUpdate() 
*/

//use of will/did mount lifecycle methods
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: null
    };
  }
  componentWillMount() {
    console.log('This happens before the render function fires'); 
  }
  componentDidMount() {
    console.log('This happens after the render function fires successfully'); 
    setTimeout( () => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        <h1>Active Users: { this.state.activeUsers}</h1>
      </div>
    );
  }
};

//USE of component unmount lifecycle method 
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleEnter() {
    this.setState({
      message: this.state.message + 'You pressed the enter key! '
    });
  }
  handleKeyPress(event) {
    console.log(event.keyCode)
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};

//use of shouldComponentUpdate method

class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    return nextProps.value % 2 == 0
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>
  }
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState({
      value: this.state.value + 1
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value}/>
      </div>
    );
  }
};

//React allows for inline styling of any element, 
//you can also set the class and id of an elemnt and style that way too
class ColorfulText extends React.Component {
  render() {
    return (
      <div
        style={{
          color: "hotpink", 
          textAlign: true,
          marginBottom: 5,
          fontSize: "72px" //you can also use numbers and 'px' will be assumed. othe units must be specified and a string used 
        }}
      >This Text Will Be Colorful</div>
    );
  }
};

//A common practice to get styling out of the way of component logic is to set a styles object to a contant and store your styling this way
const styles = {
  
  div: {
    border: "2px solid purple",
    margin: 10
  },

  text: {    
    color: "purple",
    fontSize: 40,
    fontWeight: 300,

  }
}

class ColorfulText2 extends React.Component {
  render() {
    return (
      <div 
        style={{...styles.div}}
      >
        <h1
          style={{
            ...styles.text,
            textShadow: '1px 1px' //one can also combine the use of a spread style object and inline styling 
          }}
        >
          This Text Is Styled By A Style Object
        </h1>
      </div>
    );
    
  }
};

//magic 8-ball component
const inputStyle = {
  width: 235,
  margin: 5
}

class MagicEightBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      randomIndex: ''
    }
    this.ask = this.ask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  ask() {
    if (this.state.userInput) {
      this.setState({
        randomIndex: Math.floor(Math.random() * 20),
        userInput: ''
      });
    }
  }
  handleChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }
  render() {
    const eightballAnswers = [ 'It is certain','It is decidedly so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Most likely', 'Outlook not so good', 'Very doubtful'];
    const answer = eightballAnswers[this.state.randomIndex]; //the randomIndex state property will change in the 'ask' function
    return (
      <div>
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
          style={inputStyle} /><br />
        <button onClick={this.ask}>
          Ask the Magic Eight Ball!
        </button><br />
        <h3>Your Answer:</h3>
        <p>
          {answer}        
        </p>
      </div>
    );
  }
};

//one way to create dynamic displays within a component is to use if else conditionals. This is the least consise way
//this is how one could created a dynamic display using if-else
class ifElseDynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState({
      display: !this.state.display
    });
  }
  render() {

    if (this.state.display) {
        return (
          <div>
            <button onClick={this.toggleDisplay}>Toggle Display</button>
            <h1>Displayed!</h1>
          </div>
        );
    } else {
        return (
          <div>
            <button onClick={this.toggleDisplay}>Toggle Display</button>
          </div>
        );
    }
    
  }
};
//notice the code in the render function is practicly doubled this goes against everything a developer knows about clean/DRY code
//a better practice is to use && for more concise conditionals. This works well if only one thing is being changed with  a condtional
// here is the same render method from above without 
render = () => {
    return (
      <div>
        <button onClick={this.toggleDisplay}>Toggle Display</button>
        {/* much shorter code because only the h1 element relies on the conditional being true  */}
        { this.state.display &&<h1>Displayed!</h1>}
      </div>
    );
}
//another way to do this is to use a ternary operator
//this example will allow 
const inputStyle = {
  width: 235,
  margin: 5
}

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      userAge : '',
    }
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type="number"
          value={this.state.input}
          onChange={this.handleChange} /><br />
        {
          this.state.userAge == '' ? buttonOne : this.state.userAge >= 18 ? buttonTwo : buttonThree
        }
      </div>
    );
  }
};