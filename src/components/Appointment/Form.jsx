import React, {useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

import '../InterviewerList.scss';
import '../Button.scss';

export default function Form(props){
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || '');
  const [error, setError] = useState('');

  const handleStudentChange = (event) => {setStudent(event.target.value)};
  const handleInterviewerChange = (event) => {setInterviewer(event)};

  const reset = () => {setStudent(''); setInterviewer('')}
  const cancel = () => {reset(); props.onCancel()}

  const validate = () => {
    if (student === '') {
      setError("Student name cannot be blank.");
      return;
    }
    if (interviewer === '') {
      setError("No interviewer selected.");
      return;
    }
    props.onSave(student,interviewer);
  }

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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          onChange={handleInterviewerChange}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}