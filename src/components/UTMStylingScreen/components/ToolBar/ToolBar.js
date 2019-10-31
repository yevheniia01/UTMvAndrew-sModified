import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    padding: '0px !important'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: 0,
    background: '#0a0aaf',
    marginTop: '-2px',
    height: '40px',
    marginBottom: '1rem',
    
  },
  button: {
    margin: '3px',
    color: 'white',
    fontFamily: "'Roboto', sans-serif",
    textTransform: 'lowercase',
  },
}));

export default function ToolBar() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{padding: 0}}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{padding: 0}}>
          <Paper className={classes.paper}>
          <Button className={classes.button}>Configure</Button>
          <Button className={classes.button}>Form</Button>
          <Button className={classes.button}>Style</Button>
          </Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}