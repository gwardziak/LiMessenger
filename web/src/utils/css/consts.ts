export enum Size {
  XS,
  SM,
  MD,
  BG,
}

export type SizeRange = {
  min?: number;
  max?: number;
  // orientation?: "portrait" | "landscape";
};

// https://flaviocopes.com/css-breakpoints/MaxWidthBoundary.tsx

export const sizes: { [key in Size]: SizeRange } = {
  [Size.BG]: { min: 1024 },
  [Size.MD]: { min: 640, max: 1023 },
  [Size.SM]: { min: 321, max: 639 },
  [Size.XS]: { max: 320 },
};
