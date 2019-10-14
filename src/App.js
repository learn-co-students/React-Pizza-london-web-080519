import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
class App extends Component {
	state = { pizzas: [], editingPizza: {} };

	getPizzas = () => {
		return fetch("http://localhost:3000/pizzas")
			.then(resp => resp.json())
			.then(pizzas => this.setState({ pizzas: pizzas }));
	};

	componentDidMount() {
		this.getPizzas();
	}

	handleFormSubmission = () => {
		// let newPizzaList = this.state.pizzas;
		// newPizzaList[this.state.editingPizza.id - 1] = this.state.editingPizza;
		// this.setState({ pizzas: newPizzaList });

		fetch(`http://localhost:3000/pizzas/${this.state.editingPizza.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.state.editingPizza),
		}).then(resp => this.getPizzas());
	};

	launchEditForm = pizza => {
		let pizzaToEdit = Object.assign({}, pizza);
		this.setState({ editingPizza: pizzaToEdit });
	};

	handleToppingChange = event => {
		let newPizza = this.state.editingPizza;
		newPizza.topping = event.target.value;
		this.setState({ editingPizza: newPizza });
	};

	handleSizeChange = event => {
		let newPizza = this.state.editingPizza;
		newPizza.size = event.target.value;
		this.setState({ editingPizza: newPizza });
	};

	handleVegetarianChange = event => {
		let newPizza = this.state.editingPizza;
		newPizza.vegetarian = event.target.value === "Vegetarian";
		this.setState({ editingPizza: newPizza });
	};

	render() {
		return (
			<Fragment>
				<Header />
				<PizzaForm
					pizzaToEdit={this.state.editingPizza}
					handleFormSubmission={this.handleFormSubmission}
					handleToppingChange={this.handleToppingChange}
					handleSizeChange={this.handleSizeChange}
					handleVegetarianChange={this.handleVegetarianChange}
				/>
				<PizzaList
					pizzas={this.state.pizzas}
					launchEditForm={this.launchEditForm}
				/>
			</Fragment>
		);
	}
}

export default App;
