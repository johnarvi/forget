import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

//PRIMARY SECONDARY
function MyButton(props) {

  return (
    <Button variant="contained" className="button" onClick={props.onClick} color={props.buttonColor} disableElevation>
      {props.buttonText}
    </Button>
  );
}

export default MyButton;
