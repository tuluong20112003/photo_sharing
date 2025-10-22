import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import {CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import "./PostStyle.css";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from '@mui/icons-material/Send';
import {IconButton} from "@mui/material";

const Post = ({ imageUrl, fullname, creationDate, comments, photo, handleSendComment, setComment, comment }) => {

  if(!comments) comments = [];
  return (
    <>
      <Card sx={{ margin: { xs: ".5rem", sm: "3rem" } }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="user" />}
          title={fullname}
          subheader={getDateTimeFormat(new Date(creationDate))}
        />
        <CardMedia
          component="img"
          height="350rem"
          image={imageUrl}
          alt="Paella dish"
          sx={{ backgroundPosition: "center", backgroundSize: "cover" }}
        />
        <Divider/>
        <CardContent>
          {comments.map(comment => {
            return (<Comment comment={comment} />)
          })}
          <TextField
            id="input-with-icon-textfield"
            label="Add your commnet"
            fullWidth
            value={comment}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label="send" onClick={() => handleSendComment(photo._id)}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            onKeyDown={(e) => {
              if(e.key === "Enter") handleSendComment(photo._id)
            }}
            onChange={(e) => setComment(e.target.value)}
            variant="standard"
          />
        </CardContent>
      </Card>
    </>
  );
};

const Comment = ({comment}) => {
  return (
    <div class="comment-container">
      <Avatar sx={{ bgcolor: red[500] }} aria-label="user" />
      <Box
        sx={{ backgroundColor: "#eee", borderRadius: "50px", padding: "18px 32px" }}
      >
        <div className="comment-detail">
          <div className="info">
            <span className="username">{comment.user.first_name + " " + comment.user.last_name}</span>
            <span className="creation-date">{getDateTimeFormat(new Date(comment.date_time))}</span>
          </div>
          <span className="comment">
            {comment.comment}
          </span>
        </div>
      </Box>
      <Divider/>
    </div>
  );
};

const getDateTimeFormat = (date) => {
  const formatedDate =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  return formatedDate;
};

export default Post;
