import React from 'react';
import Button from '../Button';

export default function Confirm(props){
  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}><span role="img" aria-label="cross">❌</span>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Delete<span role="img" aria-label="exclamation mark">❗</span></Button>
      </section>
    </main>
  );
}