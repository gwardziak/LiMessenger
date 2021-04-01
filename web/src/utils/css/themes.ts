type Themes = {
  light: Theme;
  dark: Theme;
};

type Theme = {
  colors: {
    body: string;
    text: string;
  };
  svg: {
    background: string;
    color: string;
    hover: string;
    filter: string;
  };
  input: {
    color: string;
    placeholder: string;
    background: string;
  };
  item: {
    hover: string;
    select: string;
    secondHover: string;
  };
  scroll: {
    color: string;
  };
  divider: {
    color: string;
  };
  emojiPicker: {
    background: string;
    hover: string;
    border: string;
  };
};

export const themes: Themes = {
  light: {
    colors: {
      body: "#FFFFFF",
      text: "#050505",
    },
    svg: {
      background: "rgba(0, 0, 0, 0.04)",
      color: "#000",
      hover: "rgb(233,233,233)",
      filter: "",
    },
    input: {
      color: "#1c1e21",
      placeholder: "#65676b",
      background: "rgba(0,0,0,0.05)",
    },
    item: {
      hover: "rgba(0, 0, 0, 0.05)",
      select: "rgba(0, 0, 0, 0.04)",
      secondHover: "rgb(205, 207, 211)",
    },
    scroll: {
      color: "rgba(0, 0, 0, 0.4) !important",
    },
    divider: {
      color: "rgba(0, 0, 0, 0.1)",
    },
    emojiPicker: {
      background: "#fff",
      hover: "#f4f4f4",
      border: "rgb(217, 217, 217)",
    },
  },
  dark: {
    colors: {
      body: "#131313",
      text: "#c9c9c9",
    },
    svg: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "#707070",
      hover: "rgb(42,42,42)",
      filter: "brightness(0.5) invert(0.4)",
    },
    input: {
      color: "#c9c9c9",
      placeholder: "#707070",
      background: "rgba(255, 255, 255, 0.05)",
    },
    item: {
      hover: "rgba(255, 255, 255, 0.05)",
      select: "rgba(255, 255, 255, 0.04)",
      secondHover: "rgb(53, 53, 53)",
    },
    scroll: {
      color: "rgb(188,192,196) !important",
    },
    divider: {
      color: "rgba(255,255,255,0.12)",
    },
    emojiPicker: {
      background: "#202020",
      hover: "rgba(255, 255, 255, 0.25)",
      border: "#202020",
    },
  },
};
