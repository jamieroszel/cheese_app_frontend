import { useState } from "react"
function Show(props) {
  const id = props.match.params.id
  const cheeses = props.cheese
  const cheese = cheese.find(p => p._id === id)

  // state for form
  const [editForm, setEditForm] = useState(cheese)

  // handleChange function for form
  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  }

  // handlesubmit for form
  const handleSubmit = event => {
    event.preventDefault()
    props.updateCheese(editForm)
    // redirect people back to index
    props.history.push("/")
  }

  const removeCheese = () => {
    props.deleteCheese(cheese._id)
    props.history.push("/")
  }

  return (
    <div className="person">
      <h1>{cheese.name}</h1>
      <h2>{cheese.countryOfOrigin}</h2>
      <img src={cheese.image} alt={cheese.name} />
      <button id="delete" onClick={removeCheese}>
        Delete
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
          placeholder="Country of Origin"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cheese" />
      </form>
    </div>
  )
}

export default Show