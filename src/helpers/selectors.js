export function getAppointmentsForDay(state, day) {

  const dayMatch = state.days.find((days) => days.name === day);

  if (!dayMatch) {
    return [];
  }

  const appointmentID = dayMatch.appointments;

  const appointmentArr = appointmentID.map((id) => state.appointments[id]);
  return appointmentArr;
};

export function getInterviewersForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  const daysArr = state.days.filter((specificDay) => {
    return day === specificDay.name;
  });

  if (daysArr.length === 0) {
    return [];
  }

  const interviewerID = daysArr[0].interviewers;

  if (interviewerID.length === 0) {
    return [];
  }

  let result = [];

  for (const id of interviewerID) {
    const interviewer = state.interviewers[id];
    result.push(interviewer);
  }

  return result;
};


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const id = interview.interviewer;

  if (state.interviewers[id]) {
    return {
      student: interview.student,
      interviewer: state.interviewers[id],
    };
  }
};