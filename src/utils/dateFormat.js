export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", options);
};

export const formatTime = (dateString) => {
  const options = { hour: "numeric", minute: "numeric", hour24: true };
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-IN", options);
};

export const formatDateTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", options);
};
