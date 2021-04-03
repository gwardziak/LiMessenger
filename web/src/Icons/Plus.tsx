import React from "react";

type MyProps = {
  isToggle?: boolean;
};

export const Plus = ({
  isToggle,
  ...props
}: React.SVGProps<SVGSVGElement> & MyProps) => {
  return (
    <svg {...props} viewBox="30 30 448 448">
      <path d="M256,32C132.3,32,32,132.3,32,256s100.3,224,224,224s224-100.3,224-224S379.7,32,256,32z M384,272H272v112h-32V272H128v-32   h112V128h32v112h112V272z"></path>
    </svg>
  );
};
