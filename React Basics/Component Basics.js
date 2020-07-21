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