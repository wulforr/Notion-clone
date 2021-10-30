export const getValueFromLocalStorage = (key, defaultValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));
  return savedValue ? savedValue : defaultValue;
};

export const setValueToLocalStorage = (key, value) => {
  const valueToSave = JSON.stringify(value);
  localStorage.setItem(key, valueToSave);
};
