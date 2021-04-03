import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    text: {
      color: {
        primary: string;
        secondary: string;
      };
    };
    body: {
      background: string;
    };
    svg: {
      background: string;
      color: string;
      hover: string;
      active: string;
    };
    img: {
      filter: string;
      hover: string;
    };
    input: {
      color: string;
      placeholder: string;
      background: string;
    };
    item: {
      hover: string;
      select: string;
    };
    scroll: {
      color: string;
    };
    divider: {
      color: string;
    };
    modal: {
      background: string;
      shadow: string;
      overlay: string;
    };
    emojiPicker: {
      background: string;
      hover: string;
      border: string;
    };
  }
}

export type Themes = {
  light: DefaultTheme;
  dark: DefaultTheme;
};

export const themes: Themes = {
  light: {
    body: {
      background: "rgb(255, 255, 255)",
    },
    text: {
      color: {
        primary: "rgb(5, 5, 5)",
        secondary: "rgb(101,103,107)",
      },
    },
    svg: {
      background: "rgba(0, 0, 0, 0.04)",
      color: "rgb(0, 0, 0)",
      hover: "rgb(233,233,233)",
      active: "rgb(218, 219, 220)",
    },
    img: {
      filter: "",
      hover: "rgb(205, 207, 211)",
    },
    input: {
      color: "rgb(5, 5, 5)",
      placeholder: "rgb(101, 103, 107)",
      background: "rgba(0,0,0,0.05)",
    },
    item: {
      hover: "rgba(0, 0, 0, 0.05)",
      select: "rgba(0, 0, 0, 0.04)",
    },
    scroll: {
      color: "rgba(0, 0, 0, 0.4)",
    },
    divider: {
      color: "rgba(0, 0, 0, 0.1)",
    },
    modal: {
      background: "rgb(255,255,255)",
      shadow: "rgba(255, 255, 255, 0.5)",
      overlay: "rgba(134, 142, 153, 0.25)",
    },
    emojiPicker: {
      background: "rgb(255, 255, 255)",
      hover: "rgb(244, 244, 244)",
      border: "rgb(217, 217, 217)",
    },
  },
  dark: {
    body: {
      background: "rgb(19, 19, 19)",
    },
    text: {
      color: {
        primary: "rgb(201, 201, 201)",
        secondary: "rgb(112, 112, 112)",
      },
    },
    svg: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "rgb(112, 112, 112)",
      hover: "rgb(42,42,42)",
      active: "rgb(47,48,49)",
    },
    img: {
      filter: "brightness(0.5) invert(0.4)",
      hover: "rgb(53, 53, 53)",
    },
    input: {
      color: "rgb(201, 201, 201)",
      placeholder: "rgb(112, 112, 112)",
      background: "rgba(255, 255, 255, 0.05)",
    },
    item: {
      hover: "rgba(255, 255, 255, 0.05)",
      select: "rgba(255, 255, 255, 0.04)",
    },
    scroll: {
      color: "rgb(188,192,196)",
    },
    divider: {
      color: "rgba(255,255,255,0.12)",
    },
    modal: {
      background: "rgb(32, 32, 32)",
      shadow: "rgba(255, 255, 255, 0.12)",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    emojiPicker: {
      background: "rgb(32, 32, 32)",
      hover: "rgba(255, 255, 255, 0.25)",
      border: "rgb(32, 32, 32)",
    },
  },
};
