import { useMedia } from "react-use";

export type UseMatchesMediaQuery = {
  (mq: string): boolean;
  (mediaQueries: string[]): boolean;
};

export const useMatchesMediaQuery: UseMatchesMediaQuery = (
  arg: string | string[]
): boolean => {
  if (!Array.isArray(arg)) {
    arg = [arg];
  }

  return useMedia(arg.join(", "));
};
