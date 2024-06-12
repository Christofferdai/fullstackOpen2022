import Person from "./Person"
const Persons = ({personsToShow, deletePerson}) => {
  return (
    <ul>
      {personsToShow.map((person) => <Person key={person.id} name={person.name} number={person.number} onClick={() => deletePerson(person.id)}/>)}
    </ul>
  )
}

export default Persons