// Imports
import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const intItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const clickHandler = () => {
    if (props.setInterviewer) {
      props.setInterviewer();
    }
  }

  return (
    <li className={intItemClass} onClick={clickHandler}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};