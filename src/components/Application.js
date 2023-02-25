// Import React Hooks
import React, {useState, useEffect} from "react";

// Import Axios
import axios from "axios";

// Import Styling
import "components/Application.scss";

//Import Components
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((response) => {
      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}));
    })
  }, [])

  const getAppointments = getAppointmentsForDay(state, state.day);
  const getInterviewers = getInterviewersForDay(state, state.day);

  const appointmentsArr = getAppointments.map(i => {

    const interview = getInterview(state, i.interview);

    return (
      <Appointment
        key={i.id}
        id={i.id}
        time={i.time}
        interview={interview}
        interviewers={getInterviewers}
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
      <section className="schedule">
        {appointmentPropsArr}
      </section>
    </main>
  );
}
