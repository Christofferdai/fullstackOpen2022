import { useState, useEffect } from "react"
import Query from "./components/Query"
import apiService from "./services/countries"
import Results from "./components/Results"

const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    apiService.getAll().then(countries => {
      setAllCountries(countries)
    })}, [])

  const countriesToShow = search === '' ? [] : allCountries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  
  const handleChange = (e) => {
    setSearch(e.target.value)
  }  
  return (
    <div>
      <Query value={search}  onChange={handleChange}/>
      <Results countries={countriesToShow} />
    </div>
  )
}

export default App