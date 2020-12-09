import { useEffect, useRef, useState } from "react";

export const useIsVisible = (initialIsVisible: boolean) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef(null);
  const handlerRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      handlerRef.current &&
      (handlerRef.current! as any).contains(event.target)
    ) {
      return;
    }
    if (ref.current && !(ref.current! as any).contains(event.target)) {
      setIsVisible(false);
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keyup", handleEscapeKey, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keyup", handleEscapeKey, true);
    };
  }, []);

  return { handlerRef, ref, isVisible, setIsVisible };
};
