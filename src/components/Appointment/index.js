import React from 'react'
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save appointments
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then((response) => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  // cancel appointments
  function cancel() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  };


  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
        )}
      
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          interviewer={props.interviewers.interviewer}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message="Saving"/>}

      {mode === DELETING && <Status message="Deleting"/>}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={cancel}
          onCancel={back}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error 
          message="Error: Unable to save appointment."
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error 
          message="Error: Unable to delete appointment."
          onClose={back}
        />
      )}
    </article>
  );
};