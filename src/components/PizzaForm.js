import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" onChange={event => props.setTopping(event.target.value)}placeholder="Pizza Topping" value={
                 props.currentPizza !== null ? props.currentPizza.topping : 'Pizza Topping'
              }/>
        </div>
        <div className="col">
          <select onChange={event => props.setSize(event.target.value)} value={props.currentPizza !== null ? props.currentPizza.size : 'Small'} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" onChange={event => props.setVeg(true)} checked={ props.currentPizza !== null ? props.currentPizza.vegetarian : false} />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={event => props.setVeg(false)} checked={props.currentPizza !== null ? !(props.currentPizza.vegetarian) : false}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={event => props.postPizza()}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
