
import React from "react"

class PizzaForm extends React.Component {
  render(){
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" value={
                this.props.pizzaToEdit.topping
              } onChange={event => this.props.editTopping(event.target.value)}/>
        </div>
        <div className="col">
          <select value={this.props.pizzaToEdit.size} className="form-control" onChange={event => this.props.editSize(event.target.value)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="true" name="vegetarian" checked={this.props.pizzaToEdit.vegetarian} onChange={event => this.props.editVeggie(event.target.value)}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="false" name="vegetarian" checked={!this.props.pizzaToEdit.vegetarian} onChange={event => this.props.editVeggie(event.target.value)}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => this.props.updatePizza()}>Submit</button>
        </div>
      </div>

  )
}
}

export default PizzaForm