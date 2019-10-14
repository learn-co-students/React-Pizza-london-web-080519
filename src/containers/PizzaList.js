import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {

mapData = () => {

  return this.props.data.map(pizza => { 
   return  <Pizza {...pizza} currentPizza={pizza} key={pizza.id} setCurrentPizza={this.props.setCurrentPizza}/>
  })
}


  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            this.mapData()
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
