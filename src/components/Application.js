// Import React Hooks
import React from "react";
// Import Styling
import "components/Application.scss";
// Import Components
import DayList from "./DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
// Import helper functions
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // Display appointments for day
  const getAppointments = getAppointmentsForDay(state, state.day);
  // Display interviewers for day
  const getInterviewers = getInterviewersForDay(state, state.day);

  const appointmentsArr = getAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={getInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  const appointmentPropsArr = [...appointmentsArr, <Appointment key="last" time="5pm" />];

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentPropsArr}</section>
    </main>
  );
};
