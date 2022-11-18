export const timeConverter = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

export const capitalize = (s) => {
  return s
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};
