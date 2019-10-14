import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
import { create } from 'domain';
class App extends Component {

  PIZZAS_URL = "http://localhost:3000/pizzas/"

  state = {
    pizzas: [],
    selectedPizza: {topping: "", size: "", vegetarian: true}
  }

  post = (newPizza) => {
    return fetch(this.PIZZAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newPizza)
    })
  }

  patch = (selectedPizza) => {
    return fetch(this.PIZZAS_URL + selectedPizza.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(selectedPizza)
    })
  }

  getLatestPizzas = () => {
    fetch(this.PIZZAS_URL).then(response => response.json())
    .then(pizzas => this.setState({pizzas}))
  }

  componentDidMount() {
    this.getLatestPizzas()
  }

  handleFormChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    if (value === "true") {value = true}
    if (value === "false") {value = false}
    this.setState({selectedPizza: {...this.state.selectedPizza, ...{[key]: value}}})
  }

  handleSubmit = () => {
    if (this.state.selectedPizza.hasOwnProperty("id")) { // if selected pizza has id
      // patch with existing id
      this.updatePizza()
    } else {
      this.createNewPizza()
    }
  }

  handleEditSetup = (pizza) => {
    this.setState({selectedPizza: pizza})
  }

  createNewPizza = () => {
    this.post(this.state.selectedPizza)
    .then(this.setState({selectedPizza: {topping: "", size: "", vegetarian: true}}))
    .then(this.getLatestPizzas)
  }

  updatePizza = () => {
    this.patch(this.state.selectedPizza)
    .then(this.setState({selectedPizza: {topping: "", size: "", vegetarian: true}}))
    .then(this.getLatestPizzas)
  }

  render() {
    return (
      <Fragment>
        <Header/>
        {/* <button onClick={this.post}>New 4 Cheese</button> */}
        <PizzaForm selectedPizza={this.state.selectedPizza} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} handleEditSetup={this.handleEditSetup}/>
      </Fragment>
    );
  }
}

export default App;
