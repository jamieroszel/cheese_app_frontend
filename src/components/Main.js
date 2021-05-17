import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [dogs, setDogs] = useState(null);

  const URL = "https://peoplereactapp.herokuapp.com/people/";

  const getDogs = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setDogs(data);
  };

  const createDogs = async (person) => {
    // make post request to create dogs
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of dogs
    getDogs();
  }

  const updateDogs = async (person, id) =>{
    // make post request to create dogs
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    // update list of dogs
    getDogs()
  }

  const deleteDogs = async id =>{
    // make post request to create people
    await fetch(URL + id, {
      method: "delete",
    })
    // update list of dogs
    getDogs()
  }

  useEffect(() => getDogs(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index dogs={dogs} createDogs={createDogs} />
        </Route>
        <Route
          path="/dogs/:id"
          render={(rp) => 
            <Show
              dogs={dogs}
              updateDogs={updateDogs}
              deleteDogs={deleteDogs}
              {...rp}
            />
          }
        />
      </Switch>
    </main>
  )
}

export default Main;