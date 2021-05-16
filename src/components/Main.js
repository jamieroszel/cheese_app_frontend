import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";


function Main(props) {
  const [cheeses, setCheeses] = useState(null);

  const URL = "https://react-cheese-jr.herokuapp.com/cheese/";

  const getCheese = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  const createCheeses = async (cheese) => {
    // make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    // update list of people
    getCheeses();
  };

  const updateCheeses = async (cheese, id) => {
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    })
    getCheeses()
  }
  const deleteCheeses = async (id) => {
    await fetch(URL + id, {
      method: "delete",
      })
    getCheeses()
  }

  useEffect(() => getCheeses(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index cheese={cheeses} createCheeses={createCheeses} />
        </Route>
        <Route
          path="/cheese/:id"
          render={(rp) => (
            <Show
              cheese={cheeses}
              updateCheese={updateCheeses}
              deleteCheese={deleteCheeses}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;