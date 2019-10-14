import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";

class App extends Component {
  state = {
    pizzaListArray: [],
    editPizza: {}
  };

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          pizzaListArray: data
        })
      );
  }

  handleEditButton = pizza => {
    this.setState({
      editPizza: pizza
    });
  };

  updateFormValue = (event, input) => {
    this.setState({
      editPizza: {
        ...this.state.editPizza,
        [input]: event.target.value
      }
    });
  };

  updateVegetarianCheckBox = value => {
    this.setState({
      editPizza: {
        ...this.state.editPizza,
        vegetarian: value
      }
    });
  };

  handleSubmit = () => {
    const { editPizza } = this.state;
    fetch(`http://localhost:3000/pizzas/${editPizza.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editPizza)
    })
      .then(resp => resp.json())
      .then(this.updateEditedPizzaInArray);
  };

  updateEditedPizzaInArray = updatedPizza => {
    let { pizzaListArray } = this.state;
    let newPizzaArray = pizzaListArray.map(pizza => {
      if (pizza.id === updatedPizza.id) {
        return (pizza = updatedPizza);
      } else {
        return pizza;
      }
    });
    this.setState({
      pizzaListArray: newPizzaArray
    });
  };

  render() {
    const { pizzaListArray, editPizza } = this.state;
    return (
      <Fragment>
        <Header />
        <PizzaForm
          pizza={editPizza}
          handleSubmit={this.handleSubmit}
          updateFormValue={this.updateFormValue}
          updateVegetarianCheckBox={this.updateVegetarianCheckBox}
        />
        <PizzaList
          pizzaListArray={pizzaListArray}
          handleEditButton={this.handleEditButton}
        />
      </Fragment>
    );
  }
}

export default App;
