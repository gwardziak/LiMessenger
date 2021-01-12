import React, { useState } from "react";
import RSC from "react-scrollbars-custom";

//ScrollbarProps
/*
i jescze omit tych propsow ktorych nie pasujesz (te co sa uzywane w komponencie)
*/

/*
type MyProps = Omit<ScrollbarProps, "trackXProps" | "trackYProps" | "onMouseEnter" | "onMouseLeave"> & {
    autoHide?: boolean
}
w arrow function spawdac czy jest na props.onMouseEnter i callowac po twojej funkcji
<PrawdziwyScrollbar onMouseOver={e => {
  hideCostem(true);
  if (props.onMouseOver) {
   props.onMouseOver(e);
 }
}}
*/

export const MyScrollbar = ({
  elementRef,
  autoHide,
  children,
  ...props
}: any) => {
  const [inUse, setInUse] = useState<boolean>();
  const style = {
    style: autoHide && { visibility: inUse ? "visible" : "hidden" },
  };

  return (
    <RSC
      trackXProps={style}
      trackYProps={style}
      onMouseEnter={autoHide && (() => setInUse(true))}
      onMouseLeave={autoHide && (() => setInUse(false))}
      ref={elementRef}
      {...props}
    >
      {children}
    </RSC>
  );
};
