import React from "react";
import { Field } from "formik";
import { TextField } from "formik-mui";

const Input = (props) => {
  const { label, name, id, ...rest } = props;
  return (
    <Field
      name={name}
      label={label}
      id={id}
      component={TextField}
      fullWidth
      margin="normal"
      {...rest}
    />
  );
};

export default Input;
