import React from "react"

class PizzaForm extends React.Component {
  state = {
    id: null,
    topping: null,
    size: null,
    vegetarian: null
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.topping !== this.props.topping || nextProps.size !== this.props.size || nextProps.vegetarian !== this.props.vegetarian) {
      this.setState({
        id: nextProps.id,
        topping: nextProps.topping,
        size: nextProps.size,
        vegetarian: nextProps.vegetarian
      })
    } 
  }
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleVegChange = e => {
    this.setState({
      vegetarian: e.target.value === 'Vegetarian' ? true : false
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.editPizzaFormSubmit(this.state)
  }
  
  render() {
    return(
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control" placeholder="Pizza Topping" name='topping' onChange={this.handleChange} value={
                  this.state.topping
                }/>
          </div>
          <div className="col">
            <select value={this.state.size} className="form-control" name='size' onChange={this.handleChange}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" onChange={this.handleVegChange} name="vegetarian" checked={this.state.vegetarian ? true : null}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={this.handleVegChange} name="vegetarian" checked={this.state.vegetarian === false ? true : null}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>

    )
  }
}

export default PizzaForm
