import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Counter.css'
import { decrement, increment, incrementByAmount } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.counter)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState();
  const addValue = Number(amount) || 0;

  return (
      <div className='main'>
        <div className='container'>
          <span>Counter value is: {count}</span>   
         <div>

          <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
         >
          Increment
         </button>

         <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
         >
          Decrement
        </button>
          <div className='amount'>
            <input type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}/>
            <button onClick={()=>dispatch(incrementByAmount(addValue))}>Add amount</button>
          </div>
         </div>
       </div>
      </div>
  )
}