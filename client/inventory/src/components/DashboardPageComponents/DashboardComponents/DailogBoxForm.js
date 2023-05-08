import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FormCard from "../../molecules/Cards/FormCard";
import { makeStyles } from "@mui/styles";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import AlertBox from "../../atoms/AlertBox";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormControl from "../../molecules/FormControl/FormControl";
import { vatList, imageValidation } from "../../../utils/commons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import WarningIcon from "@mui/icons-material/Warning";
import Alert from "@mui/material/Alert";
import {
  addProduct,
  productSelector,
  resetState,
  getProductDetails,
  editProduct,
} from "../../../redux/slices/productDetails";
import Loading from "../../atoms/Loading";

const useStyles = makeStyles((theme) => ({
  authSectionMain: {
    height: "100%",
    overflow: "auto",
    width: "100%",
    // backgroundImage: `url(${HalfBack})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    // boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
  },
  containerRoot: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    maxWidth: 619,
    /* [theme.breakpoints.only("lg")]: {
      width: 550,
    }, */
    /* [theme.breakpoints.only("md")]: {
      width: 660,
    }, */
    /* [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(9),
    }, */
  },
  input: {
    display: "none",
  },
  kycUploadBtn: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  dragNdDropText: {
    color: "#0F2940",
    fontWeight: "bold",
    border: "1px dashed grey",
    borderRadius: "10px",
  },
  title: {
    fontWeight: "bold",
    color: "#800080",
  },
  alert: {
    // width: "80px",
    margin: 10,
  },
}));

function DailogBoxForm(props) {
  const { open, onCloseForm, selectedValue, width, editing } = props;
  const classes = useStyles();
  const formikRef = useRef();
  const [data, setData] = useState([]);
  const [filrUrl, setFileUrl] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [imgValidation, setImgValidation] = useState({
    invalid: false,
    msg: "",
  });
  const dispatch = useDispatch();
  const {
    isPostSuccess,
    isPostfailure,
    failurePostResponse,
    successPostResponse,
    isLoading,
  } = useSelector(productSelector);

  const handleClose = () => {
    dispatch(resetState());
    onCloseForm(null);
    setData([]);
    setFileUrl("");
    dispatch(resetState());
    dispatch(getProductDetails());
    //   dispatch(clearImageUrl());
  };

  const setNetPrice = (gross, vat, setFieldValue) => {
    if (gross && vat) {
      const percentOfGross = (gross * vat) / 100;
      let netPrice = gross - percentOfGross;
      setFieldValue("netPrice", netPrice);
      formikRef.current.values.netPrice = netPrice;
    } else {
      setFieldValue("netPrice", 0);
      formikRef.current.values.netPrice = 0;
    }
  };

  const initialValues = {
    id: null,
    name: "",
    vat: "",
    qty: "",
    grossPrice: "",
    netPrice: 0,
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Product name is required")
      .matches(/^[a-zA-Z ]*$/, "Please enter valid product"),
    vat: yup.string().required("Vat % is required"),
    qty: yup
      .number()
      .required("Quality is required")
      .min(1)
      .max(1000, "Value needs to be less than 1000"),
    grossPrice: yup.number().required("Price (gross) is required").min(1),
    netPrice: yup.number().required("Price (net) is required").min(1),
  });

  const UploadApi = async (params) => {
    const res = await axios.post(`http://localhost:5000/fileUpload`, params);
    return res.data;
  };

  useEffect(() => {
    if (data.name && data?.size) {
      console.log(data);
      if (imageValidation(data.name)) {
        uploadFile();
      } else {
        setImgValidation({
          invalid: true,
          msg: "please upload jpg or png image format",
        });
      }
    }
  }, [data]);

  const uploadFile = async () => {
    setImgValidation({ invalid: false, msg: "" });
    try {
      let requestData = new FormData();
      requestData.append("product", data);
      const res = await UploadApi(requestData);
      if (res.success) {
        setFileUrl(res.path_url);
        setAlert(true);
        setIsSuccess(true);
        setMsg("uploaded successfully");
        const timer = setTimeout(() => {
          setAlert(false);
          setIsSuccess(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      setAlert(true);
      setMsg("upload failed");
      setIsSuccess(false);
      const timer = setTimeout(() => {
        setAlert(false);
        setMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (filrUrl && data?.name && !imgValidation.invalid) {
      setSubmitting(false);
      const reqBody = {
        name: values.name,
        vat: values.vat,
        grossPrice: values.grossPrice,
        netPrice: values.netPrice,
        qty: values.qty,
        photo: {
          url: filrUrl,
          file: data?.name,
        },
        id: editing && values.id,
      };
      if (editing) {
        dispatch(editProduct(reqBody));
      } else {
        dispatch(addProduct(reqBody));
      }
    } else {
      if (!imgValidation.invalid) {
        setImgValidation({
          invalid: true,
          msg: "Plese upload the product image",
        });
      }
    }
  };

  useEffect(() => {
    if (isPostSuccess) {
      const timer = setTimeout(() => {
        setAlert(false);
        setMsg("");
        handleClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPostSuccess, isPostfailure]);

  useEffect(() => {
    if (editing) {
      setFileUrl(selectedValue.photo.url);
      setData({ name: selectedValue.photo.file });
    }
  }, [editing, selectedValue]);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullScreen={width === "xs" ? true : false}
      // fullWidth={true}
      maxWidth="sm"
    >
      {isLoading && <Loading isOpen={true} />}
      <FormCard>
        {isPostfailure && (
          <AlertBox severity="error">
            {failurePostResponse || "couldn't get product list"}
          </AlertBox>
        )}
        {isPostSuccess && (
          <AlertBox severity="success">{successPostResponse}</AlertBox>
        )}
        <Formik
          initialValues={selectedValue || initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                alignContent="center"
                width="100%"
                height="100%"
                paddingY={3}
              >
                <Box textAlign="center">
                  <Typography variant="h5" className={classes.title}>
                    {editing ? "Edit Product" : "Add New Product"}
                  </Typography>
                </Box>
                <Box width="60%">
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={"Product"}
                    placeholder={"Eg. Potato.."}
                    name="name"
                    type="text"
                    id="name"
                    required
                  />
                </Box>
                <Box width="60%">
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={"Quantity"}
                    placeholder={"Enter No. of Qty"}
                    name="qty"
                    type="number"
                    id="qty"
                    required
                  />
                </Box>
                <Box width="60%">
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={" $ Price(gross)"}
                    placeholder={"Eg. 100"}
                    name="grossPrice"
                    type="number"
                    id="grossPrice"
                    onChange={(e) => {
                      setFieldValue("grossPrice", parseInt(e.target.value));
                      setNetPrice(
                        parseInt(e.target.value),
                        formikRef.current.values.vat,
                        setFieldValue
                      );
                    }}
                    required
                  />
                </Box>
                <Box width="60%">
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    name="vat"
                    label={"VAT"}
                    options={vatList}
                    id="vat"
                    onChange={(e) => {
                      setFieldValue("vat", e.target.value);
                      setNetPrice(
                        formikRef.current.values.grossPrice,
                        e.target.value,
                        setFieldValue
                      );
                    }}
                    required
                  />
                </Box>

                <Box width="60%">
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={"$ Price(net)"}
                    placeholder={"Eg. 100"}
                    name="netPrice"
                    type="number"
                    id="netPrice"
                    disabled
                    required
                  />
                </Box>

                <Box
                  width="60%"
                  className={classes.dragNdDropText}
                  textAlign="center"
                  marginY={2}
                  padding={2}
                >
                  <input
                    accept="image/jpeg,image/png"
                    className={classes.input}
                    id="fileData"
                    type="file"
                    name="fileData"
                    onChange={(event) => {
                      if (event.currentTarget.files[0]) {
                        setFieldValue("fileData", event.currentTarget.files[0]);
                        setData(event.currentTarget.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="fileData">
                    <Button
                      color="primary"
                      variant="outlined"
                      component="span"
                      style={{ fontSize: 17 }}
                      startIcon={<CloudUploadIcon />}
                    >
                      <Typography
                        variant="subtitle2"
                        className={classes.kycUploadBtn}
                      >
                        {data.name ? "upload another" : " upload"}
                      </Typography>
                    </Button>
                  </label>
                  <Box marginY={2}>
                    <Typography style={{ fontSize: 12 }}>
                      We support <strong> jpg & png format </strong>. Make sure
                      your file size is not more than 1 MB.
                    </Typography>
                  </Box>
                  {data.name && (
                    <Box marginY={2}>
                      <Typography style={{ fontSize: 14 }} color="primary">
                        <strong>image selected: </strong> {data.name}
                      </Typography>
                    </Box>
                  )}
                </Box>
                {imgValidation.invalid && (
                  <Box width="60%">
                    <Alert
                      variant="outlined"
                      severity="error"
                      className={classes.alert}
                    >
                      {imgValidation.msg}
                    </Alert>
                  </Box>
                )}
                <Box width="60%" marginTop={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={submitForm}
                    fullWidth
                    className={classes.addBtn}
                    // fullWidth
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </FormCard>
    </Dialog>
  );
}

export default DailogBoxForm;
