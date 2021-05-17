import { useState } from "react"
import { Link } from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    countryOfOrigin: "",
  })

  // handleChange function for form
  const handleChange = event => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }

  // handle submit function for form
  const handleSubmit = event => {
    event.preventDefault()
    props.createDogs(newForm)
    setNewForm({
      name: "",
      image: "",
      countryOfOrigin: "",
    })
  }

  // loaded function
  const loaded = () => {
    return props.dogs.map(dog => (
      <div key={dog._id} className="dog">
        <Link to={`/dogs/${dog._id}`}>
          <h1>{dog.name}</h1>
        </Link>
        <img src={dog.image} alt={dog.name} />
        <h3>{dog.countryOfOrigin}</h3>
      </div>
    ))
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="countryOfOrigin"
          onChange={handleChange}
        />
        <input type="submit" value="Create Dog" />
      </form>
      {props.dogs ? loaded() : loading()}
    </section>
  )
}

export default Index