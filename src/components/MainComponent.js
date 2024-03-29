import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import '../App.css';
import AboutComponent from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps= state => {
    return{
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => {dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))}
})

class Main extends Component {

  onDishSelect(dishId) {
    console.log("clicked")
    this.setState({ selectedDish: dishId});
    console.log(this.props.selectedDish,"==========> This is the selected DISH")
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMsg={this.props.dishes.errorMsg}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMsg={this.props.promotions.errorMsg}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMsg={this.props.leaders.errorMsg}
            />
        );
      }

      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              isLoading={this.props.dishes.isLoading}
              errMsg={this.props.dishes.errorMsg}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
              commentsErrMsg={this.props.comments.errorMsg}
              postComment={this.props.postComment} />
        );
      };

      const AboutUs = () => {
        return(
          <AboutComponent leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading} errMsg={this.props.leaders.errorMsg} />
        );
      };

    return (
      <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route path='/aboutus' component={AboutUs} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
