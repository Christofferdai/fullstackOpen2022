const PersonForm =({newName, newNumber,handleNameChange, handleNumberChange, addNewPerson}) => {
  return (
    <form>
      <div>
        name: <input type="text" value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input type="text" value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={addNewPerson}>add</button>
      </div>
    </form>
  )
}

export default PersonForm