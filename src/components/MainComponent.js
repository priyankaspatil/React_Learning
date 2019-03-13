import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import '../App.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state ={
      dishes:DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    console.log("clicked")
    this.setState({ selectedDish: dishId});
    console.log(this.state.selectedDish,"==========> This is the selected DISH")
}

  render() {
    const HomePage = () => {
        return(
            <Home 
            />
        );
      }
    return (
      <div className="App">
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
        </Switch>
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]} />
        <Footer />
      </div>
    );
  }
}

export default Main;
