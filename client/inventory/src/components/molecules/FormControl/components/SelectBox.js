import React from "react";
import { Field } from "formik";
import { TextField } from "formik-mui";
import { MenuItem } from "@mui/material";

const SelectBox = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <Field
      name={name}
      label={label}
      component={TextField}
      fullWidth
      margin="normal"
      select
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Field>
  );
};

export default SelectBox;
