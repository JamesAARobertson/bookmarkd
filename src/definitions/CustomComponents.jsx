import { styled } from "@mui/system";
import { TextField, Button, Slider } from "@mui/material";

export const SearchBar = styled(TextField)({
    "& label.MuiInputLabel-root": {
        fontFamily: "League Spartan",
        color: "#FFFFFF",
        fontSize: "4vw"
    },
    "& label.Mui-root": {
        color: "#FFFFFF",
    },
    "& label.Mui-focused": {
        fontSize: "3vw",
        color: "#FFFFFF",
    },
    "& .MuiOutlinedInput-root": {
        fontFamily: "League Spartan",
        color:"#FFFFFF",
        "& fieldset": {
            borderColor: "#FFFFFF",
        },
    },
    "& .MuiTextField-root": {
        color: "#FFFFFF",
}});

export const BookButton = styled(Button)({
    padding: 0,
    border: 0,
    margin: 0,
    minWidth: 0,
    color:"#FFFFFF",
    width: 32,
    height: 32,
})

/*bg-element-blue text-white w-8 h-8*/


export const BookSlideBar = styled(Slider)({
    color: '#A7ADBB',
    height: "3vw",
    width: "80vw",
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: "5.5vw",
      width: "5.5vw",
      backgroundColor: '#A7ADBB',
      border: '5px solid #E1DDD1',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: '0px 0px 5px 5px #00000055',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      color: "#000",
      lineHeight: "1.2rem",
      fontSize: "1.2rem",
      fontFamily: "League Spartan",
      background: 'unset',
      padding: 0,
      width: "10vw",
      height: "10vw",
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#E1DDD1',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });