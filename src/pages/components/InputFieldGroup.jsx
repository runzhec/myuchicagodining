import * as React from "react";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  useTheme,
} from "@mui/material";

function ControlledRadioButtonsGroup({ sex, setSex }) {
  const theme = useTheme();

  const handleChange = (event) => {
    setSex(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <FormLabel
        sx={{
          marginBottom: theme.spacing(2),
          color: theme.palette.text.secondary,
          textAlign: "left",
        }}
      >
        Your Stats
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={sex}
        onChange={handleChange}
        sx={{
          justifyContent: "flex-start",
          "& .MuiFormControlLabel-root": {
            marginLeft: 0,
          },
          "& .MuiSvgIcon-root": {
            fontSize: "1.25rem",
          },
        }}
      >
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  );
}

function TextInput({ val, setVal, label }) {
  const handleChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      value={val}
      onChange={handleChange}
    />
  );
}

export default function InputFieldGroup({
  sex,
  setSex,
  weight,
  setWeight,
  heightFt,
  setHeightFt,
  heightIn,
  setHeightIn,
}) {
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: theme.spacing(4),
        maxWidth: { xs: "100%", sm: "50vw" }, // 100% width on smallest screens, 50vw on others
        width: "80%",
        height: "auto",
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        "& .MuiTextField-root": {
          m: theme.spacing(1),
          width: "calc(100% - 32px)",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <ControlledRadioButtonsGroup sex={sex} setSex={setSex} />
      <TextInput val={weight} setVal={setWeight} label={"Weight (lb)"} />
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          width: "100%",
          mt: theme.spacing(1),
          flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens, horizontally on larger
        }}
      >
        <TextInput val={heightFt} setVal={setHeightFt} label={"Height (ft)"} />
        <TextInput val={heightIn} setVal={setHeightIn} label={"Height (in)"} />
      </Box>
    </Box>
  );
}
