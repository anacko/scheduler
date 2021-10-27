import React, {useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

import '../InterviewerList.scss';
import '../Button.scss';

export default function Form(props){
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || '');

  const handleStudentChange = (event) => {setStudent(event.target.value)};
  const handleInterviewerChange = (event) => {setInterviewer(event)};

  const reset = () => {setStudent(''); setInterviewer('')}
  const cancel = () => {reset(); props.onCancel()}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={handleStudentChange}
          />
        </form>
        <InterviewerList
          value={interviewer}
          onChange={handleInterviewerChange}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}