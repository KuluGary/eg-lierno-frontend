import { stringToHsl } from "@lierno/core-helpers";

/**
 * @see {@link https://mui.com/system/the-sx-prop|MUI Docs}
 */
const style = {
  avatar: (fallBackText) => ({
    bgcolor: stringToHsl(fallBackText),
  }),
};

export default style;
