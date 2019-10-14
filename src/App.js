import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
class App extends Component {
  state = {
    pizzas: [],
    pizzaToEdit: []
  };

  componentDidMount = () => {
    this.getPizzas();
  };

  getPizzas = () => {
    fetch("http://localhost:3000/pizzas")
      .then(resp => resp.json())
      .then(pizzas => this.setState({ pizzas: pizzas }));
  };

  editPizza = pizza => {
    this.setState({
      pizzaToEdit: {
        id: pizza.id,
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian
      }
    });
  };

  editTopping = newValue => {
    this.setState({
      pizzaToEdit: { ...this.state.pizzaToEdit, topping: newValue }
    });
  };
  editSize = newValue => {
    this.setState({
      pizzaToEdit: { ...this.state.pizzaToEdit, size: newValue }
    });
  };

  editVeggie = () => {
    this.setState({
      pizzaToEdit: {
        ...this.state.pizzaToEdit,
        vegetarian: !this.state.pizzaToEdit.vegetarian
      }
    });
  };

  updatePizza = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.pizzaToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topping: this.state.pizzaToEdit.topping,
        size: this.state.pizzaToEdit.size,
        vegetarian: this.state.pizzaToEdit.vegetarian
      })
    }).then(this.getPizzas);
  };

  render() {
    return (
      <Fragment>
        {/* {console.log(this.state.pizzas)} */}
        <Header />
        <PizzaForm
          pizzaToEdit={this.state.pizzaToEdit}
          editTopping={this.editTopping}
          editSize={this.editSize}
          editVeggie={this.editVeggie}
          updatePizza={this.updatePizza}
        />

        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
