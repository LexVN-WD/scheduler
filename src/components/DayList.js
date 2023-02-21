import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {

  const daysArr = props.days.map(i => {
    return (
      <DayListItem
        key={i.id}
        name={i.name}
        spots={i.spots}
        selected={i.name === props.day}
        setDay={props.setDay}
      />
    );
  })

  return (
    <ul>{daysArr}</ul>
  );
}