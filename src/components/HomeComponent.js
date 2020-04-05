import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoadding, errMsg }) {
  if (isLoadding) {
    return <Loading />;
  } else if (errMsg) {
    return <h4>{errMsg}</h4>;
  } else
    return (
      <FadeTransform in 
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
}

function Home(props) {
  debugger;
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoadding={props.dishesLoading}
            errMsg={props.dishesErrMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard 
          item={props.promotion}
          isLoadding={props.promosLoading}
          errMsg={props.promosErrMsg}
        />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader}
          isLoadding={props.leadersLoading}
          errMsg={props.leadersErrMsg} 
        />
        </div>
      </div>
    </div>
  );
}

export default Home;
