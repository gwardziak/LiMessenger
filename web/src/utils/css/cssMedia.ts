import { Size, SizeRange, sizes } from "./consts";

const generateMediaQuery = (options: SizeRange): string => {
  const parts: string[] = [];

  if (typeof options.max === "number") {
    parts.push(`(max-width: ${options.max}px)`);
  }

  if (typeof options.min === "number") {
    parts.push(`(min-width: ${options.min}px)`);
  }

  // if (typeof options.orientation === "string") {
  //   parts.push(`(orientation: ${options.orientation})`);
  // }

  return parts.join(" and ");
};

export const mediaQuery = {
  bg: generateMediaQuery(sizes[Size.BG]),
  md: generateMediaQuery(sizes[Size.MD]),
  sm: generateMediaQuery(sizes[Size.SM]),
  xs: generateMediaQuery(sizes[Size.XS]),

  landscape: `(orientation: landscape)`,
  portrait: `(orientation: portrait)`,
} as const;

/**
 * A workaround for ( expectedts-styled-plugin(9999) ex.:
 * `${mediaQuery.md} and ${mediaQuery.landscape}`
 */
export const mediaQueryAnd = (a: string, b: string): string => {
  return `${a} and ${b}`;
};
