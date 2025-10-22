import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as photoService from "../../ApiService/photoService";
import { useSnackbar } from "notistack";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FormDialog(props) {
  const {forceUpdateCb} = props;
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(undefined);
  const [preview, setPreview] = React.useState("");
  const {enqueueSnackbar} = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(undefined);
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(selectedFile);
    formData.append("image", selectedFile);
    formData.append("user_id", props.currentUser._id);
    formData.append("date_time", new Date().toUTCString());
    const res = await photoService.uploadPhoto(formData);
    if(res.status === 200){
        forceUpdateCb();
        enqueueSnackbar("Upload success!", {variant: "success"});
        handleClose();
    }else{
      console.log("Error!", res);
    }
  }

  const handleOnFileChange = (e) => {
    if(e.target.files[0]){
      setSelectedFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  }

  React.useEffect(() => {
    if(selectedFile){
      // create the preview
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
      // free memory when ever this component is unmounted
    }
 }, [selectedFile])
 
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={handleClickOpen}
        color="secondary"
      >
        Upload
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            handleSubmit(event);
          },
        }}
      >
        <DialogTitle>Upload photo</DialogTitle>
        <DialogContent sx={{'display': 'flex', 'flexDirection': 'column', 'alignItems' : 'center'}} style={{'gap': '10px'}}>
          {selectedFile ? 
            <img src={preview} alt="preview-upload" width="80%" height="80%"/> :
              <></>}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Photo
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleOnFileChange} name="image" />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {selectedFile ? 
            <Button type="submit">Upload</Button> :
            <Button type="submit" disabled>Upload</Button> }
        </DialogActions>
      </Dialog>
    </>
  );
}
