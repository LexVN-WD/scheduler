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
  const setDay = day => setState({ ...state, day });
  
  // Retrieve data from API
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then((response) => {
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }));
      })
  }, []);
  
  // bookInterview Function
  function bookInterview(id, interview) {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments }))
      // updateSpots action
      .then(() => axios.get(`http://localhost:8001/api/days`))
      .then((res) => setState(prev => ({...prev, days: res.data})));
  };
  
  // cancelInterview Function
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }))
      // updateSpots action
      .then(() => axios.get(`http://localhost:8001/api/days`))
      .then((res) => setState(prev => ({ ...prev, days: res.data })));
  };

  return { state, setDay, bookInterview, cancelInterview }

};


