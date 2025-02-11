const breakpoints = {
  mobile: `758px`,
  tablet: `1023px`,
  desktop: `1024px`,
};

const media = {
  small: `screen and (max-width: ${breakpoints.mobile})`, // 최대 758 이하
  middle: `screen and (max-width: ${breakpoints.tablet})`, // 최대 1023 이하
  large: `screen and (min-width:${breakpoints.desktop})`, // 최소 1024 이상
};

const color = {
  bgColor: "#060914",
  color: "#9dc0e3",
  blue_light: "#d3e1ef",
  grey: "#4d5968",
  all: "#229c56",
  _12: "#FFA200",
  _15: "#dd7430",
  _19: "#CD1327",
};

const theme = {
  media,
  color,
};

export default theme;
