import React, {Fragment} from 'react';
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment (props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';

  const {mode, transition, back} = useVisualMode(props.interview? SHOW : EMPTY);

  const handleCancel = () => back();

  const handleSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition('STATUS-SAVING', 'replace')
    props
      .bookInterview(props.id, interview)
      .then(() => transition('SHOW'))
      .catch(() => transition('ERROR', 'replace'))
  }

  const handleDelete = () => {
    transition('STATUS-DELETING', 'replace')
    props.cancelInterview(props.id)
      .then(() => transition('EMPTY'))
      .catch(() => transition('ERROR', 'replace'))
  }

  return (
  <Fragment>
    <article className="appointment">
      <Header time={props.time}/>
      {mode === 'EMPTY' && <Empty 
        onAdd={() => transition('CREATE')} />}
      
      {mode === 'CREATE' && <Form
        interviewers={props.interviewers}
        onCancel={handleCancel} 
        onSave={handleSave}
        />}

      {mode === 'SHOW' && <Show 
        interview={props.interview} 
        onEdit={() => transition('EDIT')}
        onDelete={() => transition('CONFIRM')} 
      /> }
          
      {mode === 'EDIT' && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={handleCancel} 
        onSave={handleSave}
      />}

      {mode === 'CONFIRM' && <Confirm
        message={'Are you sure you would like to delete?'}
        onCancel={handleCancel}
        onConfirm={handleDelete}
      />}

      {mode === 'STATUS-SAVING' && <Status message={'Saving'}/>}
      {mode === 'STATUS-DELETING' && <Status message={'Deleting'}/>}

      {mode === 'ERROR' && <Error
        message={'Ops, there was an error!'}
        onClose={() => back()}
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