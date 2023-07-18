const formatValue = (value) => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + "B"; // Convert to billions
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + "M"; // Convert to millions
  } else if (value >= 1e3) {
    const thousands = Math.floor(value / 1e3); // Get the number of thousands
    if (thousands >= 1 && thousands < 2) {
      return "1K"; // Display as 1K for values between 1000 and 1999
    } else {
      return thousands + "K"; // Convert to thousands
    }
  } else {
    return value.toString(); // No conversion needed
  }
};

export default formatValue;
