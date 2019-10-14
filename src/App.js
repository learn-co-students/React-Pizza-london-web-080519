import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {


  state = {
    pizzas: [], 
    currentPizza: {},


  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas').then(resp=> resp.json()).then(resp => this.setState({pizzas: resp}))
  }

  handleToppingChange = (event) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza, 
        topping: event
    }})
  }
  handleSizeChange = (event) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza, 
        size: event
    }})
  }

  handleVegChange = (event) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza, 
      vegetarian: event === "Vegetarian"? true: false
    }})
  }


  onEditPizzaClick = (pizza) => {
    this.setState({currentPizza: pizza})
  }

  onSubmitClick = () => {
    console.log(this.state.currentPizza.id)
    fetch(`http://localhost:3000/pizzas/${this.state.currentPizza.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.currentPizza)
      }).then(resp => resp.json()).then(resp => this.setState({pizzas: this.state.pizzas.map(pizza => pizza.id === this.state.currentPizza.id? this.state.currentPizza : pizza )}))
  }



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm onSubmitClick={this.onSubmitClick} currentPizza={this.state.currentPizza} handleToppingChange={this.handleToppingChange} handleSizeChange={this.handleSizeChange} handleVegChange={this.handleVegChange} pizzaFormTopping={this.state.pizzaFormTopping} pizzaFormSize={this.state.pizzaFormSize} pizzaFormVeg={this.state.pizzaFormVeg} />
        <PizzaList onEditPizzaClick={this.onEditPizzaClick} pizzas={this.state.pizzas} />
      </Fragment>
    );
  }
}

export default App;
