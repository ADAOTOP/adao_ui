const isTouchDevice = (): boolean => {
  // return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export default isTouchDevice;
