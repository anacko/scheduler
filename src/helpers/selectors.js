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
  const intersArr = [];
  for(const inter in dayInter) {
     intersArr.push(dayInter[inter])
  }
  return intersArr;
}

const getInterviewersForDayInObjectForm = (state, day) => {
  const filteredInterviewers = state.days.filter(d => d.name === day);
  if (!filteredInterviewers[0]) {
    return [];
  }
  const dayInter = filteredInterviewers[0].interviewers
  const inters = [];
  for (const inter of dayInter) {
    inters.push(state.interviewers[[inter].toString()])
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

export { getAppointmentsForDay, getInterviewersForDay, getInterview, getInterviewersForDayInObjectForm }