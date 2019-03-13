import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';


function RenderDish(props) {
    if (props.dish != null)
        return (
            <div className='row'>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardImg top src={props.dish.image} alt={props.dish.name} />
                        <CardBody>
                            <CardTitle>{props.dish.name}</CardTitle>
                            <CardText>{props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                    <div className="col-12 col-md-5">
                        <h2>Comments</h2>
                        {props.dish.comments.map((comments) => {
                            return (
                                    <div>
                                        <span>{comments.comment}</span><br/><br/>
                                        <span>--{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comments.date)))}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
        );
    else
        return (
            <div></div>
        );
}

export default RenderDish;