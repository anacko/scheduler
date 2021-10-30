const getAppointmentsForDay = (state, day) => {
  const filteredAppointments = state.days.filter(d => d.name === day);
  if (!filteredAppointments[0]) {
    return [];
  }
  const dayApp = filteredAppointments[0].appointments
  const apps = [];
  for(const app of dayApp.toString().split(',')) {
    apps.push(state.appointments[app])
  }
  return apps ;
}

const getInterviewersForDay = (state, day) => {
  const filteredInterviewers = state.days.filter(d => d.name === day);
  if (!filteredInterviewers[0]) {
    return [];
  }
  const dayInter = filteredInterviewers[0].interviewers
  const inters = [];
  for(const inter in dayInter) {
     inters.push(dayInter[inter])
   }
  return inters;
}

const getInterview = (state, interview) => {
  
  if (!interview) { return null; }

  let interviewerId = interview.interviewer;
  let interviewerObj = state.interviewers[[interviewerId].toString()];

  return ({
    student: interview.student,
    interviewer: interviewerObj
  });
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview }