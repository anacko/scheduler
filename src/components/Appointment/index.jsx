import React, {Fragment} from 'react';
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';

export default function Appointment (props) {
  
  return (
  <Fragment>
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show /> : <Empty />}
    </article>
    
  </Fragment>
  );
}