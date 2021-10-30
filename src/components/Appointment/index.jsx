import React, {Fragment} from 'react';
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import {useVisualMode} from '../hooks/useVisualMode';

export default function Appointment (props) {
  console.log('props in Appointment', props)
  return (
  <Fragment>
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show interview={props.interview}/> : <Empty />}
    </article>
    
  </Fragment>
  );
}