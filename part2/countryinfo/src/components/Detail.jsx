import Weather from "./Weather"
const Detail = ({country}) => {
  return (
    <div>
      <span style={{display:'inline-block', fontSize:'40px', padding: '20px 20px 20px 0'}}>{country.name.common}</span>
      <img src={country.flags.png} alt={country.name.common} style={{width: 30}}/>
      <p><strong>capital</strong>: {country.capital[0]}</p>
      <p><strong>area</strong>: {country.area} km²</p>
      <p><strong>population</strong>: {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <Weather lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]} />
      </div>
    </div>
  )
}

export default Detail