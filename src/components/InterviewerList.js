import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const intArr = props.interviewers.map(i => {
    if (props.setInterviewer) {
      return (
        <InterviewerListItem
          key={i.id}
          name={i.name}
          avatar={i.avatar}
          selected={i.id === props.value}
          setInterviewer={() => props.onChange(i.id)}
        />
      );
    } else {
      return (
        <InterviewerListItem
          key={i.id}
          name={i.name}
          avatar={i.avatar}
          selected={i.id === props.value}
        />
      );
    }
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{intArr}</ul>
    </section>
  );
}