import { useState } from 'react'

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (  
    <p>No feedback given</p>
    )
  }

  return (
    <div>
    <h1>staistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>average {(good - bad) / all}</p>
    <p>positve {good / all * 100} %</p>
  </div>
  )
}
  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  return (
    <>
      <div>
        <h1>give feedback</h1>
        <button onClick={() => {setGood(good+1)}}>good</button>
        <button onClick={() => {setNeutral(neutral+1)}}>neutral</button>
        <button onClick={() => {setBad(bad+1)}}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      
  </>
    
  )
}

export default App