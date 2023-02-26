import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  
  // state Object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  // setDay action
  const setDay = (day) => setState({ ...state, day });
  
  // Retrieve data from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (day, days, appointments) => {
    // find the day object in the days array
    const dayObj = days.find((days) => days.name === day);
    let spots = 0;

    for (const id of dayObj.appointments) {
      
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };


  // bookInterview Function
  function bookInterview(id, interview) {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    const spots = updateSpots(state.day, state.days, appointments);

    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return {...day, spots};
      }
      return day;
    })

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
      });
    
  }
  
  // cancelInterview Function
  function cancelInterview(id) {

    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const spots = updateSpots(state.day, state.days, appointments);

    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots };
      }
      return day;
    })

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  };
  return { state, setDay, bookInterview, cancelInterview };
};


