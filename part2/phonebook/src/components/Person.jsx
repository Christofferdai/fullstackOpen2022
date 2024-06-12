const Person = ({name, number, onClick}) => {
  return (
      <li>{name} {number} <button onClick={onClick}>delete</button></li>
  )
}

export default Person;