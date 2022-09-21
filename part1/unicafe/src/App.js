import { useState } from 'react'


const Button = ({text,onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}
const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (  
    <p>No feedback given</p>
    )
  }

  return (
    <div>
    <h1>staistics</h1>
    <StatisticLine text='good' value={good} />
    <StatisticLine text='neutral' value={neutral} />
    <StatisticLine text='bad' value={bad} />
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
        <Button text={'good'} onClick={() => {setGood(good+1)}} />
        <Button text={'neutral'} onClick={() => {setNeutral(neutral+1)}} />
        <Button text={'bad'} onClick={() => {setBad(bad+1)}} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      
  </>
    
  )
}

export default App