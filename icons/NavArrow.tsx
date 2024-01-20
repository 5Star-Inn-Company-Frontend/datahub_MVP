import * as React from 'react';
export const NavArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={8}
    fill="none"
    {...props}
  >
    <path stroke="currentColor" strokeLinecap="round" d="m1 1 4.355 5.4L10 1" />
  </svg>
);
