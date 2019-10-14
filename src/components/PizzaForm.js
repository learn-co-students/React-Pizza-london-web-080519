import React from "react";

const PizzaForm = props => {
  const { topping, size, vegetarian } = props.pizza;
  return (
    <div className="form-row">
      <div className="col-5">
        <input
          type="text"
          className="form-control"
          placeholder="Pizza Topping"
          value={topping}
          onChange={event => props.updateFormValue(event, "topping")}
        />
      </div>
      <div className="col">
        <select
          value={size}
          className="form-control"
          onChange={event => props.updateFormValue(event, "size")}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Vegetarian"
            checked={vegetarian ? true : false}
            onChange={() => props.updateVegetarianCheckBox(true)}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Not Vegetarian"
            checked={vegetarian ? false : true}
            onChange={() => props.updateVegetarianCheckBox(false)}
          />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button
          type="submit"
          className="btn btn-success"
          onClick={props.handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PizzaForm;
