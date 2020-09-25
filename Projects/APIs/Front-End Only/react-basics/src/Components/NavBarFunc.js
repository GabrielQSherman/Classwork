import React, {useState} from 'react'

export default function NavBarFunc(props) {

  const [count, setCount] = useState(0);

  const counterUp = () => {
   setCount(count+1) 
  }

  const counterDown = () => {
    setCount(count-1)
  }

  const counterReset = () => {
    setCount(0)
  }
   
  return (
    <div>
        <h1>
          {`FUNCTIONAL The Count is ${count}`}
        </h1>
        <button
          onClick={counterUp}
        >
          +1
        </button>
      
        <button
          onClick={counterDown}
        >
          -1
        </button>
      
        <button
          onClick={counterReset}
        >
          Reset
        </button>
      </div>
  )
}
