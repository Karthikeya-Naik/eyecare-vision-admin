export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${period}`;
};

export const isSlotAvailable = (date, time, appointments) => {
  if (!appointments || !appointments.length) return true;
  
  const selectedDateTime = new Date(`${date}T${time}`);
  
  return !appointments.some(appt => {
    const apptStart = new Date(`${appt.appointment_date}T${appt.start_time}`);
    const apptEnd = new Date(`${appt.appointment_date}T${appt.end_time}`);
    return selectedDateTime >= apptStart && selectedDateTime < apptEnd;
  });
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};