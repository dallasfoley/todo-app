export const generateTimes = () => {
  const times = [];
  let hours = 0;
  let minutes = 0;

  while (hours < 24) {
    // Format hours and minutes into "hh:mm AM/PM"
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const period = hours < 12 ? "AM" : "PM";

    times.push(`${formattedHours}:${formattedMinutes} ${period}`);

    // Increment by 15 minutes
    minutes += 15;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  return times;
};
