export function Shield({ color = "#00000", width = 35, height = 35, sx, groupProps }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 981.25 981.25"
      xmlSpace="preserve"
      style={{ height: `${height}px`, width: `${width}px`, margin: "10px", ...(!!sx && sx) }}
    >
      <g fill={color} {...groupProps}>
        <path
          d="M946.23,206.651c-0.3-23-18-42-40.899-44.101c-190.3-17.8-345.601-119.5-396.8-156.7c-10.7-7.8-25.2-7.8-35.9,0
		c-51.1,37.2-206.4,138.9-396.7,156.7c-22.9,2.101-40.5,21.101-40.9,44.101c-2.3,150.1,21.8,659.699,444.1,773.1
		c7.5,2,15.4,2,22.9,0C924.331,866.451,948.43,356.75,946.23,206.651z"
        />
      </g>
    </svg>
  );
}
