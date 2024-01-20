import { SVGProps } from 'react';

export const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.12}
      d="M10.706 12.786c0-2.295-2.558-4.16-4.853-4.16S1 10.491 1 12.786M5.853 6.546a2.773 2.773 0 1 0 0-5.546 2.773 2.773 0 0 0 0 5.546Z"
    />
  </svg>
);

export const UserActiveIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={46}
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <rect width={39} height={39} x={3} y={3} fill="#fff" rx={19.5} />
      </g>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.12}
        d="M27.706 28.786c0-2.295-2.558-4.16-4.853-4.16S18 26.491 18 28.786M22.853 22.546a2.773 2.773 0 1 0 0-5.546 2.773 2.773 0 0 0 0 5.546Z"
      />
      <defs>
        <filter
          id="a"
          width={45}
          height={45}
          x={0}
          y={0.75}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={0.75} />
          <feGaussianBlur stdDeviation={1.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4150_23921"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4150_23921"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )