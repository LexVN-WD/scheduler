export function getAppointmentsForDay(state, day) {
  if (state.days.length !== 0) {
    
    const dailyAppointmentsArr = state.days.filter(i => i.name === day);

    if (dailyAppointmentsArr.length !== 0) {
      const result = Object.values(state.appointments).filter(i => dailyAppointmentsArr[0].appointments.includes(i.id));
      return result;
    }
    return [];
  }
  return [];
}