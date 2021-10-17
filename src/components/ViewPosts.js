import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Fab,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./ViewPosts.module.css";

const PostCard = ({ post }) => {
  return (
    <div className={styles.card}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {post.title} - by {post.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const getPosts = async () => {
    await Axios.get("https://workers.okto.workers.dev/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((response) => console.log(response));
  };

  const submitPost = async () => {
    setOpen(false);

    if (username && title && content) {
      const newPost = {
        username,
        title,
        content,
      };
      await Axios.post("https://workers.okto.workers.dev/posts", newPost)
        .then(() => {
          console.log("Successfully created new post");
          setPosts(posts.concat([newPost]));
        })
        .catch(() => {
          console.log("Problem");
        });
    }

    setUsername("");
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles.background}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <br />
        <br />
        {posts.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
        <br />
        <br />
      </Grid>
      <Fab
        aria-label="add"
        style={{
          margin: 0,
          top: "auto",
          right: 50,
          bottom: 50,
          left: "auto",
          position: "fixed",
          color: "black",
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Add a new post</DialogTitle>
        <DialogContent>
          <DialogContentText>What's on your mind?</DialogContentText>
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            variant="standard"
            onChange={onChangeUsername}
          />
          <br />
          <br />
          <TextField
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            onChange={onChangeTitle}
          />
          <br />
          <br />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            fullWidth
            variant="standard"
            multiline
            onChange={onChangeContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitPost}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewPosts;
