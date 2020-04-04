import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
library.add(fas, faPen);

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentFrom extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false
          };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }



    handleSubmit(values){
        this.handleToggle()
        this.props.postComment(this.props.dish.id, values.rating, values.yourname, values.comments   )
        // alert("Your feedback is submited! & Current state is:" + JSON.stringify(values));
    }

    handleToggle=()=>{
        this.setState(values => ({
            modal: !values.modal
          }));
    }

    render(){
        if(this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(this.props.errMsg) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMsg}</h4>
                    </div>
                </div>
            )
        }
        else if (this.props.dish != null)
            return (
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="col-12 col-md-5">
                        <Card>
                            <CardImg top src={baseUrl + this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5">
                        {this.props.comments.map((comments) => {
                            return (
                                    <div className="container">
                                        <span>{comments.comment}</span>
                                        <br/><br/>
                                        <span>--{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comments.date)))}</span>
                                    </div>
                                );
                            })
                        }
                        <div>
                        <div className="row-md-5">
                            <Button onClick={this.handleToggle} color="primary"><FontAwesomeIcon icon="pen" /> Submit Comment</Button>{' '}
                        </div>
                        <div>
                            <Modal isOpen={this.state.modal} toggle={this.handleToggle} >
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} postComment={this.props.postComment} dishId={this.props.dish.id}>
                                    <ModalHeader toggle={this.handleToggle}>Submit Comment</ModalHeader>
                                    <ModalBody>
                                        <Row className='form-group'>
                                            <Label htmlFor="rating" md={2}>Rating</Label>
                                            <Col md={10}>
                                                <Control.select model='.rating' className='form-control' id="rating" name="rating" placeholder="Rating" validators={{required}} >
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </Control.select>
                                                <Errors
                                                    className='text-danger'
                                                    model='.rating'
                                                    show='touched'
                                                    messages={{
                                                        required: 'Required'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='form-group'>
                                            <Label htmlFor="yourname" md={2}>Your Name</Label>
                                            <Col md={10}>
                                                <Control.text model='.yourname' className='form-control' id="yourname" name="yourname" placeholder="Your Name" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}  />
                                                <Errors
                                                    className='text-danger'
                                                    model='.yourname'
                                                    show='touched'
                                                    messages={{
                                                        required: 'Required',
                                                        minLength: 'Must be greater than 2 characters',
                                                        maxLength: 'Must be 15 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='form-group'>
                                            <Label htmlFor="comments" md={2}>Comments</Label>
                                            <Col md={10}>
                                                <Control.textarea model=".comments" id="comments" name="comments" rows="6" className='form-control'/>
                                            </Col>
                                        </Row>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Row className='form-group' >
                                            <Button type="submit" color="primary">Submit</Button>
                                        </Row>
                                    </ModalFooter>
                                </LocalForm>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
            
    }
}

    export default CommentFrom;