import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
  return {
    logo: require('./assets/images/tom_light.png'),
    sparkles: {
      topLeft: require('./assets/images/sparkles-top-left.png'),
      top: require('./assets/images/sparkles-top.png'),
      topRight: require('./assets/images/sparkles-top-right.png'),
      right: require('./assets/images/sparkles-right.png'),
      bottomRight: require('./assets/images/sparkles-bottom-right.png'),
      bottom: require('./assets/images/sparkles-bottom.png'),
      bottomLeft: require('./assets/images/sparkles-bottom-left.png'),
      loginsc:require("./assets/images/login.png"),
      main:require("./assets/images/main.png"),
      bglg:require("./assets/images/nikhil.png"),
      otplg:require("./assets/images/Nikhil1.png"),
    },
    icons: {
      colors: require('./assets/images/colorswatch.png'),
      send: require('./assets/images/send.png'),
      translate: require('./assets/images/translate.png'),
    },
  };
}
