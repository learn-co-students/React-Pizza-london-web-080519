import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" onChange={(event)=>props.handleToppingChange(event.target.value)} value={
                //Pizza Topping Should Go Here
                // props.pizzaFormTopping
                props.currentPizza? props.currentPizza.topping : 'Pizza Topping' 
              }/>
        </div>
        <div className="col">
          <select onChange={(event)=>props.handleSizeChange(event.target.value)} value={props.currentPizza.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" onChange={(event)=>props.handleVegChange(event.target.value)}checked={props.currentPizza.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={(event)=>props.handleVegChange(event.target.value)} checked={!props.currentPizza.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={()=>props.onSubmitClick()}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
