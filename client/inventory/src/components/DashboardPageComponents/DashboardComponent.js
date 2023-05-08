import React, { useEffect, useState } from "react";
// import { DashboardStyles } from "./DashboardComponentStyle";
import { IconButton, useTheme } from "@mui/material";
import {
  Box,
  Button,
  useMediaQuery,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  TableFooter,
  TablePagination,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useNavigate } from "react-router-dom";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRightIconIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertBox from "../atoms/AlertBox";
import { useSelector, useDispatch } from "react-redux";
import {
  productSelector,
  getProductDetails,
  deleteProduct,
  resetState,
} from "../../redux/slices/productDetails";
import { DashboardStyles } from "./DashboardComponentStyle";
import DailogBoxForm from "./DashboardComponents/DailogBoxForm";
import Loading from "../atoms/Loading";
function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    // <Template>
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Button
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </Button>
      <Button
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRightIconIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </Button>
      <Button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIconIcon />
        )}
      </Button>
      <Button
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </Button>
    </Box>
  );
}

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

function DashboardComponent() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [productDetail, setProductDetail] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [addEditDialogBoxOpen, setAddEditDialogBoxOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [keyID, setkeyID] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const handleClickOpen = (url) => {
    setImgUrl(url);
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImgUrl("");
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const classes = DashboardStyles();

  const peleteProcess = (key) => {
    console.log(key);
    setkeyID(key);
    handleClickOpen1();
  };

  const onDelete = async (key) => {
    console.log(key);
    dispatch(deleteProduct(key));
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productDetail.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editUser = (details) => {
    console.log(details);
    details = { id: details._id, ...details };
    setEditing(true);
    setSelectedValue(details);
    setAddEditDialogBoxOpen(true);
  };

  const {
    isDetailSuccess,
    isDetailFailure,
    isLoading,
    errorDetailResponse,
    detailResponsData,
    isDeleteSuccess,
    isDeleteFailure,
    deleteSuccessResponse,
    deleteFailureResponse,
  } = useSelector(productSelector);

  const getAllProductDetails = async () => {
    dispatch(getProductDetails());
  };

  useEffect(() => {
    getAllProductDetails();
  }, []);

  useEffect(() => {
    handleClose1();
    dispatch(resetState());
    if (isDeleteSuccess) {
      getAllProductDetails();
    }
  }, [isDeleteSuccess, isDeleteFailure]);

  useEffect(() => {
    if (isDetailSuccess) {
      setProductDetail(detailResponsData);
    }
  }, [detailResponsData, isDetailSuccess]);

  const handleCloseAddEditDialogBox = (value) => {
    setAddEditDialogBoxOpen(false);
    setSelectedValue({});
    setEditing(false);
  };

  return (
    <>
      {isLoading && <Loading isOpen={true} />}
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        marginY={5}
      >
        {isDetailFailure && (
          <AlertBox severity="error">
            {errorDetailResponse || "couldn't get product list"}
          </AlertBox>
        )}
        <Box
          marginY={3}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          width="60%"
          minWidth="50%"
          flexWrap="wrap"
          p={2}
        >
          <Button
            onClick={() => setAddEditDialogBoxOpen(true)}
            size="small"
            startIcon={<AddIcon />}
            className={classes.addBtn}
            variant="contained"
          >
            Add New
          </Button>
          <Typography variant={"h4"} style={{ color: "#FFFFFF" }}>
            Products
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          style={{
            maxWidth: 1000,
            border: "2px solid #EEF1FF",
          }}
        >
          {alert && <AlertBox severity="error">{msg}</AlertBox>}
          <Table
            sx={{
              minWidth: 100,
              //   maxWidth: 200,
              height: "100%",
            }}
          >
            <TableHead>
              <TableRow style={{ background: "#EAF2FC" }}>
                <TableCell>
                  <Typography variant={"subtitle1"} color="inherit">
                    Product Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    Vat
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    Quantity
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={"subtitle1"} color="inherit">
                    {" $ Price (gross)"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    {" $ Price (net)"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={"subtitle1"} color="inherit">
                    Photo
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={"subtitle1"} color="inherit">
                    Delete
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant={"subtitle1"} color="inherit">
                    Edit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? productDetail.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : productDetail
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.vat}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.qty ? row.qty : ""}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.grossPrice ? row.grossPrice : ""}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.netPrice ? row.netPrice : ""}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.photo ? (
                      // <img src={row.photo} alt="profile" style={{ width: 50 }} />
                      <>
                        <Button
                          variant="text"
                          size="small"
                          color="primary"
                          onClick={() => handleClickOpen(row.photo.url)}
                          className={classes.imgBtn}
                        >
                          show photo
                        </Button>
                      </>
                    ) : (
                      <Typography variant={"subtitle1"} color="secondary">
                        No Photo
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <IconButton
                      className={classes.delIcon}
                      onClick={() => peleteProcess(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <IconButton
                      className={classes.editIcon}
                      onClick={() => editUser(row)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  style={{ overflow: "hidden" }}
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={12}
                  count={productDetail.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <h1>{row.photo}</h1> */}
        <img src={imgUrl} alt="" />
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={open1}
        onClose={handleClose1}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Box marginX={2}>
            <Button onClick={handleClose1}>
              <Typography>back</Typography>
            </Button>
            <Button color="error">
              <Typography color="error" onClick={() => onDelete(keyID)}>
                proceed
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <DailogBoxForm
        selectedValue={selectedValue}
        open={addEditDialogBoxOpen}
        onCloseForm={handleCloseAddEditDialogBox}
        editing={editing}
      />
    </>
  );
}

export default DashboardComponent;
