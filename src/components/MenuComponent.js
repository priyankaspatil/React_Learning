import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        console.log("clicked")
        this.setState({ selectedDish: dish});
        console.log(this.state.selectedDish,"==========> This is the selected DISH")
    }
    
    

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div  className="col-12 col-md-5 m-1">
                    <Card key={dish.id}
                    onClick={() => this.onDishSelect(dish)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                    </Card>
              </div>
            );
        });
        debugger;
        const selectedDish = this.props.dishes.filter((dishItem) => dishItem.id === this.state.selectedDish );
        return (
          <div className="container">
            <div className="row">
                    {menu}
                </div>
                <div>
                    {/* {this.renderDish(this.state.selectedDish)} */}
                    <DishDetail dish={this.state.selectedDish}/>
                </div>
          </div>
        );
    }
}

export default Menu;