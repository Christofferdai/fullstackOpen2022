import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({country}) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
    <img src={country.flags.png} />
  </div>
)

const App= () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
      })
  })
  // console.log(countries);

  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value);
  }
  
  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearch} /></div>
      <div>
        {countries.length > 10 
          ? "To many matches, specify another filter."
          : countries.map(country => <Country country={country} key={country.name.common} />)}
      </div>
    </div>
  );
}

export default App;
