import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

state = {
  pizzaData: [],
  currentPizza: null
}

componentDidMount () {
  return this.getPizzas()
}

getPizzas = () => {
  fetch(`http://localhost:3005/pizzas`).then(response => response.json()).then(pizzas => this.setState({pizzaData: pizzas}))
}

postPizza = () => {
  const data = this.state.currentPizza
 
 
  fetch(`http://localhost:3005/pizzas/${this.state.currentPizza.id}`,{
  method: 'PATCH',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data)
}).then(response => response.json()).then(pizzaRep => {
  let oldData = this.state.pizzaData
  let newData = oldData.map(pizza => { 
    if (pizza.id === pizzaRep.id) {
      return pizzaRep
    }else{
      return pizza
    }
   })
   this.setState({
     pizzaData: newData
   })
} )


}

updatePizza = () => {
  this.postPizza()
}


setCurrentPizza = (pizza) => {
  this.setState({
    currentPizza: pizza
  })
}

setTopping = (newTopping) => {

  this.setState({
    currentPizza: {
      ...this.state.currentPizza,
      topping: newTopping
    }
  })
}

setSize = (newSize) => {

  this.setState({
    currentPizza: {
      ...this.state.currentPizza,
      size: newSize
    }
  })
}

setVeg = (newVeg) => {

  this.setState({
    currentPizza: {
      ...this.state.currentPizza,
      vegetarian: newVeg
    }
  })

}



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm currentPizza={this.state.currentPizza} postPizza={this.postPizza} setTopping={this.setTopping} setSize={this.setSize} setVeg={this.setVeg}/>
        <PizzaList data={this.state.pizzaData} setCurrentPizza={this.setCurrentPizza}/>
      </Fragment>
    );
  }
}

export default App;
