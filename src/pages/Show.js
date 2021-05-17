import { useState } from "react"
function Show(props) {
  const id = props.match.params.id
  const dogs = props.dogs
  const dog = dogs.find(p => p._id === id)

  const [editForm, setEditForm] = useState(dog)

  // handleChange function for form
  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    // to prevent refresh
    event.preventDefault()
    // update the dog
    props.updateDogs(editForm, dog._id)
    // redirect dogs back to index
    props.history.push("/")
}

  const removePerson = () => {
    props.deleteDogs(dog._id)
    props.history.push("/")
  }

  return (
    <div className="person">
      <h1>{dog.name}</h1>
      <h2>{dog.countryOfOrigin}</h2>
      <img src={dog.image} alt={dog.name} />
      <button id="delete" onClick={removeDog}>
        Delete this dog
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="countryOfOrigin"
          onChange={handleChange}
        />
        <input type="submit" value="Update Dog" />
      </form>
    </div>
  )
}

export default Show