import React from "react";

export const MinusCircle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg {...props}>
        <path d="M26,16 L10,16 C9.448,16 9,16.448 9,17 L9,19 C9,19.552 9.448,20 10,20 L26,20 C26.552,20 27,19.552 27,19 L27,17 C27,16.448 26.552,16 26,16 M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30"></path>
      </svg>
    </>
  );
};
