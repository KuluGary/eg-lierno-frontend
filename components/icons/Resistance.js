function Resistance({ color = "#000000", size = 512, sx }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ height: `${size}px`, width: `${size}px`, margin: "10px", ...(!!sx && sx) }}
    >
      <g className="" transform="translate(0,0)">
        <path
          d="M256 16c25 24 100 72 150 72v96c0 96-75 240-150 312-75-72-150-216-150-312V88c50 0 125-48 150-72z"
          fill={color}
          fillOpacity="1"
          transform="translate(25.6, 25.6) scale(0.9, 0.9) rotate(0, 256, 256) skewX(0) skewY(0)"
        ></path>
      </g>
    </svg>
  );
}

export { Resistance };
