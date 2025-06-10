import React, { useState } from 'react'

function Counter() {
    const [count,setCount]=useState(100);

    const handleCount = () => {
        return (
            setCount(count + 1)
        )
    };
  return (
    <div>
        <h1>Count:{count}</h1>
        <button onClick={handleCount}>Add</button>
    </div>

  )
}

export default Counter