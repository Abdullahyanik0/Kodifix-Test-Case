export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const formatDate = (date) => {
  return new Date(date * 1000).toLocaleDateString();
};
