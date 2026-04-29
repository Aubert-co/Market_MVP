let ip = [1, 1, 1, 1];

export const XForwardedForIncrease = () => {
  for (let i = ip.length - 1; i >= 0; i--) {
    if (ip[i] < 9) {
      ip[i]++;
      break;
    } else {
      ip[i] = 1;
    }
  }

  return ip.join(".");
};
