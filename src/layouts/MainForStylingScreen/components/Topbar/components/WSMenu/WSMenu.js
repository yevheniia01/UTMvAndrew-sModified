import React from 'react';
import classNames from "classnames";

import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from "@material-ui/core/MenuList";
import DashboardIcon from '@material-ui/icons/Dashboard';
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TagIcon from '../../../../../../assets/images/icons/tagicon.png';

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
    popperFooter:{
      color: 'black',
      fontSize: '14px',
      textAlign: 'left',
      fontWeight: '600',
      fontFamily: "'Roboto Condensed', sans-serif"
    },
    popperP:{
      float: 'left',
      margin: '0px',
      padding: '9px', 
      fontSize: '15px',
      marginRight: '5rem',
      width: '80px',
      fontFamily: "'Roboto Condensed', sans-serif",
    },
    popperVl:{
      borderLeft: '2px solid white',
      height: '30px',
      display: '-webkit-inline-box',
      marginTop: '-1rem',
      marginRight: '0.5rem',
    },
    popperHeader:{
      fontFamily: "'Roboto Condensed', sans-serif",
      textAlign: 'center',
      color: 'black',
      fontSize: '17px'
    },
    popperGrow: {
      padding: '1rem'
    },
    popperClose: {
        pointerEvents: "none"
    },
    popperNav: {
      minWidth: '300px',
        [theme.breakpoints.down("sm")]: {
          position: "static !important",
          left: "unset !important",
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
        border: 'none',
        backgroundColor: '#6c9eec78',
        fontSize: "13px",
        margin: "5px",
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
        minHeight: "38px",
        "&:hover": {
          backgroundColor: primaryColor,
          color: whiteColor
        }
      }
}));

export default function WSMenu() {
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
        <Typography variant="h6">
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                aria-owns={openNotification ? "notification-menu-list-grow" : null}
                onClick={handleClickNotification}
                style={{
                    color: "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"}}
            >
                <DashboardIcon style={{ paddingRight: '5px' }} />
                Workspaces
            </Button>
        </Typography>
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
            className={classes.popperGrow}
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <Button style={{padding: '0px',
                                marginRight: '-1.5rem',
                                marginTop: '-0.5rem',
                                marginLeft: '-2.3rem',
                                float: 'right'}}
                >x</Button>
              <Typography className={classes.popperHeader} variant='h5'>MY WORKSPACES</Typography>
              <hr></hr>
              <Typography variant="h6" style={{fontWeight: '700'}} >Organization</Typography>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <Paper
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <div style={{backgroundColor: '#0a0aaf', 
                                   height:'2.5rem', 
                                   width: '1.9rem', 
                                   float: 'left',
                                   borderTopLeftRadius: '4px',
                                   borderBottomLeftRadius: '4px'}}
                      ></div>
                      <p className={classes.popperP}> P&G General </p>
                      <div className={classes.popperVl}></div>
                      <img src={TagIcon} style={{marginTop: '5px', marginBottom: '5.5px'}}
                      ></img>
                    </Paper>
                    <Paper
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <div style={{backgroundColor: '#0a0aaf', 
                                   height:'2.5rem', 
                                   width: '1.9rem', 
                                   float: 'left',
                                   borderTopLeftRadius: '4px',
                                   borderBottomLeftRadius: '4px'}}
                      ></div>
                      <p className={classes.popperP}> Neurobion </p>
                      <div className={classes.popperVl}></div>
                      <img src={TagIcon} style={{
                        marginTop: '5px',
                        marginBottom: '5.5px'}}
                      ></img>
                    </Paper>
                    <Paper
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <div style={{backgroundColor: '#0a0aaf', 
                                   height:'2.5rem', 
                                   width: '1.9rem', 
                                   float: 'left',
                                   borderTopLeftRadius: '4px',
                                   borderBottomLeftRadius: '4px'}}
                      ></div>
                      <p className={classes.popperP}>Ad Agency </p>
                      <div className={classes.popperVl}></div>
                      <img src={TagIcon} style={{
                        marginTop: '5px',
                        marginBottom: '5.5px'}}
                      ></img>
                      
                    </Paper>
                    <Typography variant="h6" style={{fontWeight: '700', marginBottom: '5rem'}} >Organization</Typography>
                    <hr></hr>
                    <Typography className={classes.popperFooter} variant='h5'>Go to All Workspaces</Typography>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}