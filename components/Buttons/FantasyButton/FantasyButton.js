import { ButtonUnstyled } from "@mui/material";
import { styled } from "@mui/system";

export const FantasyButton = styled(ButtonUnstyled)(
  ({ theme }) => `
  border: none;
  background-color: ${theme.palette.primary.main};
  cursor: pointer;
  color: ${theme.palette.primary.contrastText};
  text-transform: uppercase;
  font-size: 1.25rem;
  clip-path: url(#btn-bg);
  padding: 1em 2.5em;
  background-image: url(https://www.darkestdungeon.com/images/texture.jpg);
  background-size: cover;
  background-blend-mode: multiply;
  transition: color 250ms, background-color 250ms;
  `
);

// export const FantasyButton = ({ children, buttonProps }) => {
//   return (
//     <>
//       <ButtonUnstyled
//         {...buttonProps}
//         sx={{
//           border: "none",
//           backgroundColor: "rgb(58, 97, 161)",
//           cursor: "pointer",
//           color: "white",
//           textTransform: "uppercase",
//           fontSize: "1.25rem",
//           clipPath: "url(#btn-bg)",
//           padding: "1em 2.5em",
//           backgroundImage: "url(https://www.darkestdungeon.com/images/texture.jpg)",
//           backgroundSize: "cover",
//           backgroundBlendMode: "multiply",
//           transition: "color 250ms, background-color 250ms",
//         }}
//       >
//         {children}
//       </ButtonUnstyled>
//       {/* <button
//         {...buttonProps}
//         style={{
//           border: "none",
//           backgroundColor: "rgb(58, 97, 161)",
//           cursor: "pointer",
//           color: "white",
//           textTransform: "uppercase",
//           fontSize: "1.25rem",
//           clipPath: "url(#btn-bg)",
//           padding: "1em 2.5em",
//           backgroundImage: "url(https://www.darkestdungeon.com/images/texture.jpg)",
//           backgroundSize: "cover",
//           backgroundBlendMode: "multiply",
//           transition: "color 250ms, background-color 250ms",
//         }}
//       >
//         {children}
//       </button> */}
//       <svg
//         style={{
//           position: "absolute",
//           pointerEvents: "none",
//           width: 0,
//           height: 0,
//           zIndex: 0,
//         }}
//       >
//         <clipPath id="btn-bg" clipPathUnits="objectBoundingBox">
//           <path
//             transform="scale(0.0081 0.021)"
//             d="M0 5.721v29.463l7.003.859C.657 36.954.701 38.045.701 38.045L0 45.768l10.504 1.53 13.306-1.243 9.598-1.431.906 1.717 9.06-.573h60.604l2.693-1.716 1.4 2.003 12.232.286V32.038l-4.902-2.289c7.659-.554 6.827-5.828 6.827-5.828-5.514-.751.176-3.611.176-3.611l-.327-18.88-19.888.224L78.014.911l-6.436 1.271L68.231.796 26.266.301 16.831 1.65 16.689.188.701 0 0 5.721Z"
//           ></path>
//         </clipPath>
//       </svg>
//     </>
//   );
// };
