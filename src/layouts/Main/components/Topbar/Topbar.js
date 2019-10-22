import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography, Button } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Notifications, WSMenu } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: '#2E3B55',
    paddingLeft: 10
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <WSMenu />
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <Notifications />
          <IconButton
            className={classes.profileMenuButton}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
