import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const baseUrl = 'http://localhost:3000/pizzas/' 

class App extends Component {

state = {
     pizzas: [], 
     pizzaToEdit: {}
   }


componentDidMount() {
  fetch(baseUrl).then(resp => resp.json()).then(pizzas => this.setState({pizzas: pizzas}))
}
  
pizzaToDisplay = (pizza) => {
  console.log(pizza)
  this.setState({
    pizzaToEdit: pizza
  })
}

// --- update pizza --- // 
updatePizza = () => {
  let configObj = {
    method: 'PATCH',
    headers: {
         'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state.pizzaToEdit)
  };
  return fetch(`${baseUrl}${this.state.pizzaToEdit.id}`, configObj).then(response => response.json()).then(this.updatePizzaOnClient);
}

updatePizzaOnClient = () => {
  this.setState({
    pizzas: this.state.pizzas.map( pizza => {
      if(pizza.id === this.state.pizzaToEdit.id){
        return this.state.pizzaToEdit
      }
        return pizza
    })
  })
}

handleFormChangeTopping = (event) => {
  this.setState({
    pizzaToEdit: {
      ...this.state.pizzaToEdit,
      topping: event.target.value
    }
  })
};

handleFormChangeSize = (event) => {
  this.setState({
    pizzaToEdit: {
      ...this.state.pizzaToEdit,
      size: event.target.value
    }
  })
};

handleFormChangeVeg = (event, TrueOrFalse) => {
  console.log(TrueOrFalse)
  this.setState({
    pizzaToEdit: {
      ...this.state.pizzaToEdit,
      vegetarian: !TrueOrFalse
    }
  })
};

// --- rendering --- // 
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaToDisplay={this.state.pizzaToEdit} updatePizza={this.updatePizza} 
        handleFormChangeTopping={this.handleFormChangeTopping}
        handleFormChangeSize={this.handleFormChangeSize}
        handleFormChangeVeg={this.handleFormChangeVeg}/>
        <PizzaList pizzas={this.state.pizzas} pizzaToDisplay={this.pizzaToDisplay}/>
      </Fragment>
    );
  }
}

export default App;
