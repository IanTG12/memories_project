import { makeStyles } from "@mui/styles";

//Old method

// export default makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//     },
//   },
//   paper: {
//     padding: theme.spacing(2),
//   },
//   form: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   fileInput: {
//     width: "97%",
//     margin: "10px 0",
//   },
//   buttonSubmit: {
//     marginBottom: 10,
//   },
// }));

const myStyles = () => ({
  // root: {
  //   "& .MuiTextField-root": {
  //     margin: theme.spacing(1),
  //   },
  // },
  // paper: {
  //   padding: theme.spacing(2),
  // },

  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
});

export default myStyles;
