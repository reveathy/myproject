import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
 IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { DataGrid } from "@mui/x-data-grid";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "emailId", headerName: "E-mail ID", width: 200 },
  { field: "mobileNumber", headerName: "Mobile number", width: 200 },
  { field: "homeAddress", headerName: "Home address", width: 200 },
  { field: "officeAddress", headerName: "Office address", width: 200 },
];

export default function App() {
  let localData = localStorage.getItem("localdata")
  console.log("localdata", localData)
  const classes = useStyles();
  const [row, setRow] = useState(localData ? JSON.parse(localData):[
    {
      id: 1,
      name: "Anu",
      emailId: "Anu.mol@gmail.com",
      mobileNumber: "9856564656",
      homeAddress: "Alappuzha",
      officeAddress: "Trivandram", 
      
    },
    {
     id  : 2,
    name  :" Vamika ",
     emailId : "Vami11@yahoomail.com",
     mobileNumber : "9853724763",
     homeAddress : " Kottayam",
     officeAddress : " Trivandram"
   
   },
   {
     id  : 3,
    name  :" Sathyasivan ",
     emailId : "Siva.sathya@gmail.com",
     mobileNumber : "6378435276",
     homeAddress : " Tamil Nadu",
     officeAddress : " Chennai"
   
   },
   {
    id  : 4,
    name  :" Manuraj sinha ",
    emailId : "manu.raj@yahoomail.com",
    mobileNumber : "8574635367",
    homeAddress : " Maharastra",
    officeAddress : " Banglore"
   },
   {
      id  : 5,
     name  :" jessica ",
    emailId : "jessi@gmail.com",
    mobileNumber : "9854724734",
    homeAddress : "Gujrat",
    officeAddress : " Banglore"
   }
  ]);
  const [tempArr, setTempArr] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [error, seterror] = React.useState(false);




  const [value, setValue] = React.useState({
    id: 0,
    name: "",
    emailId: "",
    mobileNumber: "",
    homeAddress: "",
    officeAddress: "",
  }
 );

  const handleClickOpen = () => {
    setOpen(true);
    seterror(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if(!value.name || !value.emailId || !value.mobileNumber || !value.homeAddress || !value.officeAddress){
      seterror("This field is required")
      return
    }

    var defVal = value
    defVal.id = row?.length?row?.length+1:1
    var list = []
    console.log(defVal)
    list.push(defVal)
    console.log("list",row)
    setRow([...row , ...list])
    localStorage.setItem("localdata",JSON.stringify([...row , ...list]))

    setValue({
      id: 0,
      name: null,
      emailId: "",
      mobileNumber: "",
      homeAddress: "",
      officeAddress: "",
    })
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Fullstack Task
          </Typography>
        </Toolbar>
      </AppBar>

      <div
        style={{
          marginTop: "100px",
          marginRight: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          startIcon={<DeleteIcon />}
          style={{ marginRight: "20px" }}
          onClick={() => {
            if (tempArr?.selection.length > 0) {
              var arr = row;
              var selectRowId = tempArr?.selection[0];
              let del = arr.filter((item, id) => item.id != selectRowId);
              console.log("arr", arr);
              console.log("selectRowId", selectRowId);
              console.log("del", del);
              setRow(del);
              localStorage.setItem("localdata",JSON.stringify(del))

            }
          }}
        >
          Delete
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </div>

      <div style={{ height: 400, margin: "20px", marginTop: "100px" }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          onStateChange={(e) => {
            setTempArr(e);
          }}
        />
      </div>

     {open ? <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={value.name}
            error={error && !value.name}
            onChange={(e) => {
              let n = value;
              n.name = e.target.value;
              setValue({ ...n });
            }}
          />
          {error && !value.name &&
            <span id="component-helper-text" style={{color: "red"}}>{error}</span>
          }
          <TextField
            margin="dense"
            id="emailId"
            label="E-mail ID"
            type="email"
            fullWidth
            value={value.emailId}
            error={error && !value.emailId}
            onChange={(e) => {
              if(e.target.value == ""){
                
              }
              let n = value;
              n.emailId = e.target.value;
              setValue({ ...n });
            }}
          />
          {error && !value.emailId &&
            <span id="component-helper-text" style={{color: "red"}}>{error}</span>
          }
          <TextField
            margin="dense"
            id="mobileNumber"
            label="Mobile number"
            type="number"
            fullWidth
            value={value.mobileNumber}
            error={error && !value.mobileNumber}
            onChange={(e) => {
              let n = value;
              n.mobileNumber = e.target.value;
              setValue({ ...n });
            }}
          />
          {error && !value.mobileNumber &&
            <span id="component-helper-text" style={{color: "red"}}>{error}</span>
          }
          <TextField
            margin="dense"
            id="homeAddress"
            label="Home address"
            type="text"
            fullWidth
            value={value.homeAddress}
            error={error && !value.homeAddress}
            onChange={(e) => {
              let n = value;
              n.homeAddress = e.target.value;
              setValue({ ...n });
            }}
          />
          {error && !value.homeAddress &&
            <span id="component-helper-text" style={{color: "red"}}>{error}</span>
          }
          <TextField
            margin="dense"
            id="officeAddress"
            label="Office address"
            type="text"
            fullWidth
            value={value.officeAddress}
            error={error && !value.officeAddress}
            onChange={(e) => {
              let n = value;
              n.officeAddress = e.target.value;
              setValue({ ...n });
            }}
          />
          {error && !value.officeAddress &&
            <span id="component-helper-text" style={{color: "red"}}>{error}</span>
          }
        
        </DialogContent>
        <DialogActions style={{ marginTop: "20px" }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>:""}
    </div>
  );
}
