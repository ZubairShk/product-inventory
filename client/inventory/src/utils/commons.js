export const apiEndPoint = "http://localhost:5000/product/";

export const vatList = [
  {
    value: 10,
    label: "10 %",
  },
  {
    value: 15,
    label: "15 %",
  },
  {
    value: 25,
    label: "25 %",
  },
];

export const imageValidation = (fileName) => {
  if (fileName.match(/\.(jpg|png)$/)) {
    return true;
  } else {
    return false;
  }
};
