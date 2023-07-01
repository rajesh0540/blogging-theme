export function getTimePassed(dateString: string) {
  const currentDate = new Date().getTime();
  const inputDate = new Date(dateString).getTime();

  const timeDifference = Math.abs(currentDate - inputDate);

  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years + " year" + (years > 1 ? "s" : "") + " ago";
  }
  if (months > 0) {
    return months + " month" + (months > 1 ? "s" : "") + " ago";
  }
  if (weeks > 0) {
    return weeks + " week" + (weeks > 1 ? "s" : "") + " ago";
  }
  if (days > 0) {
    return days + " day" + (days > 1 ? "s" : "") + " ago";
  }
  if (hours > 0) {
    return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
  }
  if (minutes > 0) {
    return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
  }

  return "Just now";
}

export function getHumanReadableTime(timeString: string) {
  const date = new Date(timeString);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
