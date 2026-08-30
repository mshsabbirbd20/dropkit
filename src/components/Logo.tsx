export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" fill="#161814" />
      <path
        d="M8 7.5h11.5L24 12v12.5H8V7.5Z"
        stroke="#c8f542"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
      <path d="M19.5 7.5V12H24" stroke="#c8f542" strokeWidth="1.6" />
      <path d="M12 16.5h8M12 20h5.5" stroke="#c8f542" strokeWidth="1.6" />
      <path
        d="M11 26.5 16 29.5 21 26.5"
        stroke="#c8f542"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
