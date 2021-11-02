import React, {Fragment} from 'react';
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment (props) {
  //console.log('props in Appointment', props)
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';

  const {mode, transition, back} = useVisualMode(props.interview? SHOW : EMPTY);

  const handleAdd = () => transition('CREATE');
  const handleCancel = () => back();

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition('SHOW')
  }

  return (
  <Fragment>
    <article className="appointment">
      <Header time={props.time}/>
      {mode === 'EMPTY' && <Empty onAdd={handleAdd} />}
      {mode === 'SHOW' && <Show interview={props.interview} /> }
      {mode === 'CREATE' && <Form 
        interviewers={props.interviewers}
        onCancel={handleCancel} 
        onSave={save}
      />}
    </article>
    
  </Fragment>
  );
}

/* PROPS!
<Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      />
*/