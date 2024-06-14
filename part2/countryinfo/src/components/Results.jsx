import { useState } from "react"
import Detail from "./Detail"

const CountryEntry = ({country}) => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <p>{country.name.common} <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button></p>
      {show && <Detail country={country} />}
    </div>
  
  )
}


const Results = ({ countries }) => {
  
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length === 1) { 
    const country = countries[0]
    return (
      <Detail country={country} />
    )
  }
  return (
    <div>
      {countries.map(country => <CountryEntry key={country.name.common} country={country} />)}
    </div>
  )
}

export default Results