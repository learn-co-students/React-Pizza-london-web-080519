import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  
  state = {
    pizzas: [],
    currentPizza: {}
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas").then(resp => resp.json())
    .then(pizzas => this.setState({pizzas}))
  }
  
  handleEditPizzaClick = pizza => {
    this.setState({
      currentPizza: pizza
    })
  }

  editPizzaFormSubmit = pizza => {
    if (pizza.id) {
      const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(pizza)
      }
      fetch(`http://localhost:3000/pizzas/${pizza.id}`, configObj).then(resp => resp.json())
      .then(newPizza => {
        this.setState({
          pizzas: this.state.pizzas.map(pizza => pizza.id === newPizza.id ? newPizza : pizza)
        })
      })
    } else {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({topping: pizza.topping, size: pizza.size, vegetarian: pizza.vegetarian})
      }
      fetch("http://localhost:3000/pizzas", configObj).then(resp => resp.json())
      .then(newPizza => this.setState({
        pizzas: [...this.state.pizzas, newPizza]
      }))
    }
  }
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm {...this.state.currentPizza} editPizzaFormSubmit={this.editPizzaFormSubmit} />
        <PizzaList pizzas={this.state.pizzas} handleEditPizzaClick={this.handleEditPizzaClick} />
      </Fragment>
    );
  }
}

export default App;
