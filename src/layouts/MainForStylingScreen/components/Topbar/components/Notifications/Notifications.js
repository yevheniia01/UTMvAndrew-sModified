import React, { useState } from 'react';
import classNames from "classnames";

import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuList from "@material-ui/core/MenuList";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

const primaryColor = "#3f51b5";
const whiteColor = "#FFF";
const grayColor = [
    "#999",
    "#777",
    "#3C4858",
    "#AAAAAA",
    "#D2D2D2",
    "#DDD",
    "#b4b4b4",
    "#555555",
    "#333",
    "#a9afbb",
    "#eee",
    "#e7e7e7"
];
const useStyles = makeStyles(theme => ({
    popperTitle:{
      fontWeight: '600',

    },
    popperP:{

    },
    popperHeader:{
      fontFamily: "'Roboto Condensed', sans-serif",
      textAlign: 'center',
      color: 'black',
      fontSize: '17px'
    },
    popperClose: {
        pointerEvents: "none"
    },
    popperNav: {
      width: '400px',
        [theme.breakpoints.down("sm")]: {
          position: "static !important",
          left: "-7.5rem",
          top: "unset !important",
          transform: "none !important",
          willChange: "unset !important",
          "& > div": {
            boxShadow: "none !important",
            marginLeft: "0rem",
            marginRight: "0rem",
            transition: "none !important",
            marginTop: "0px !important",
            marginBottom: "0px !important",
            padding: "0px !important",
            backgroundColor: "transparent !important",
            "& ul li": {
              color: whiteColor + " !important",
              margin: "10px 15px 0!important",
              padding: "10px 15px !important",
              "&:hover": {
                backgroundColor: "hsla(0,0%,78%,.2)",
                boxShadow: "none"
              }
            }
          }
        }
    },
    dropdownItem: {
        padding: '0',
        paddingBottom: '1rem',
        fontSize: "13px",
        margin: "0 5px",
        borderRadius: "2px",
        WebkitTransition: "all 150ms linear",
        MozTransition: "all 150ms linear",
        OTransition: "all 150ms linear",
        MsTransition: "all 150ms linear",
        transition: "all 150ms linear",
        display: "block",
        clear: "both",
        fontWeight: "400",
        lineHeight: "1.42857143",
        color: grayColor[8],
        whiteSpace: "nowrap",
        height: "unset",
        minHeight: "unset",
        "&:hover": {
          backgroundColor: primaryColor,
          color: whiteColor
        }
      }
}));

export default function Notifications() {
    const [notifications] = useState([]);
    const classes = useStyles();
    const [openNotification, setOpenNotification] = React.useState(null);

    const handleClickNotification = event => {
        if (openNotification && openNotification.contains(event.target)) {
          setOpenNotification(null);
        } else {
          setOpenNotification(event.currentTarget);
        }
    };

    const handleCloseNotification = () => {
        setOpenNotification(null);
    };

  return (
    <div>
        <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            onClick={handleClickNotification}
            color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
        </IconButton>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
                  padding: '1rem'
              }}
            >
              <Paper>
              <Button style={{padding: '0px',
                              marginRight: '-1.5rem',
                              marginTop: '-0.5rem',
                              marginLeft: '-2.3rem',
                              float: 'right'}}
              >x</Button>
              <Typography className={classes.popperHeader} variant='h5'>NEW</Typography>
                <hr></hr>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <Typography className={classes.popperTitle} variant='h5'>Invite Team Member...</Typography>
                      <Typography className={classes.popperP}>Invite new team members into your current workspace</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <Typography className={classes.popperTitle} variant='h5'>Create New Workspace...</Typography>
                      <Typography className={classes.popperP}>A workspace is made up of a unique campaign url<br></br> 
                                  builder and different analytics files (dashboards, reports,<br></br> etc).
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}