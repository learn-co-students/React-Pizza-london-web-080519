import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" placeholder='pizza' className="form-control" value= {props.pizzaToDisplay ? props.pizzaToDisplay.topping : 'Pizza Topping'}
            onChange={props.handleFormChangeTopping}/>
        </div>
        <div className="col">
          <select value={props.pizzaToDisplay ? props.pizzaToDisplay.size : null} onChange={props.handleFormChangeSize} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" checked={props.pizzaToDisplay.vegetarian ? true : false}  
            onChange={(event)=>props.handleFormChangeVeg(event, false)}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" checked={props.pizzaToDisplay.vegetarian ? false : true}  
            onChange={(event)=>props.handleFormChangeVeg(event, true)}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={(event)=>props.updatePizza(event, props.pizzaToDisplay)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
