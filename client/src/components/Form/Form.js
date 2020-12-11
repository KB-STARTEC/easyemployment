import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper , MenuItem ,Select ,InputLabel} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ salary: '', name: '', dateofbirth: '', gender: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((dateofbirth) => dateofbirth._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ salary: '', name: '', dateofbirth: '', gender: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.name}"` : 'Add Employees'}</Typography>
        <TextField name="name" variant="outlined" label="name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <TextField name="salary" variant="outlined" label="salary" fullWidth value={postData.salary} onChange={(e) => setPostData({ ...postData, salary: e.target.value })} />
        <InputLabel id="demo-controlled-open-select-label"> Birth : 
        <input  id="date"
        label="Birthday"
        type="date"
          name="dateofbirth" variant="outlined" label="dateofbirth" value={postData.dateofbirth} onChange={(e) => setPostData({ ...postData, dateofbirth: e.target.value })} />
        </InputLabel>
        <InputLabel id="demo-controlled-open-select-label">Gender :
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select" name="gender"  label="gender"  value={postData.gender} onChange={(e) => setPostData({ ...postData, gender: e.target.value.split(',') })}>
          <MenuItem value="Male" >Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          
        </Select></InputLabel>
        <InputLabel id="demo-controlled-open-select-label">Add Photo

           <div className={classes.fileInput}><FileBase variant="contained" color="secondary" type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        </InputLabel>
        <Button className={classes.buttonSubmit} variant="outlined" color="secondary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
