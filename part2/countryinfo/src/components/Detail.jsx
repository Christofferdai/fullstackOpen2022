const Detail = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area} km²</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} style={{width: 150}}/>
    </div>
  )
}

export default Detail