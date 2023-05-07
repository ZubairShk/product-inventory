import React from "react";
import Input from "./components/Input";
import SelectBox from "./components/SelectBox";

const FormControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "selectbox":
      return <SelectBox {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
