export function debounce(callback, wait = 200) {
  let timeout;
  const callable = (...args) => {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
  return callable;
}
export function hexToRgb(color) {
  if (color.indexOf("#") === 0) {
    color = color.slice(1);
  }
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  if (color.length !== 6) {
    return void 0;
  }
  return {
    r: parseInt(color.slice(0, 2), 16),
    g: parseInt(color.slice(2, 4), 16),
    b: parseInt(color.slice(4, 6), 16)
  };
}
export function calculateContrastColor(color) {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return "";
  }
  return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186 ? "#000000" : "#FFFFFF";
}
