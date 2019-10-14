
import React from "react"

class Pizza extends React.Component{
  render(){
  return(
    <tr>
      <td>{this.props.pizza.topping}</td>
      <td>{this.props.pizza.size}</td>
      <td>{this.props.pizza.vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => this.props.editPizza(this.props.pizza)}>Edit Pizza</button></td>
    </tr>
  )
}
}
export default Pizza