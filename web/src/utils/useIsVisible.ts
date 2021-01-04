import { useEffect, useRef, useState } from "react";

export const useIsVisible = (initialIsVisible: boolean) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef(null);
  const handlerRef = useRef(null);

  // useKeyPressEvent("Escape", () => {
  //   setIsVisible(false);
  //   console.log("click");
  // });

  const handleClickOutside = (event: MouseEvent) => {
    console.log(ref);
    console.log("outside click");
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
    console.log("KEY CLCIKED");
    if (event.key === "Escape") {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    console.log("Hooks works");
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keyup", handleEscapeKey, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keyup", handleEscapeKey, true);
    };
  }, []);

  return { handlerRef, ref, isVisible, setIsVisible };
};
