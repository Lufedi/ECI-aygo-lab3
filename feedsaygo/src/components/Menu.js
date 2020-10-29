import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { APP_ID } from '../App';
import socket from "./SocketClient"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [users, setUsers] = useState(1)

  useEffect(() => {
      socket.on("USER_EMMIT", data => setUsers(data))
  }, [])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MiniFb - Connected users: {users}
          </Typography>
          {
              <Button color="inherit" onClick={() => {
                  localStorage.removeItem(`${APP_ID}_userdata`)
                  history.push("/")  
                }  
              }>
              Logout
            </Button>
          }
          <Button color="inherit" onClick={() => history.push("/")}>
              Login
            </Button>
          <Button color="inherit" onClick={() => history.push("/users")} >
              Sign up
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
