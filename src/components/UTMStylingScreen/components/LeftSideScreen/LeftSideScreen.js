import React from 'react';
import clsx from 'clsx';
import classNames from "classnames";
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';




const useStyles = makeStyles(theme => ({
    button: {
        marginTop: '13px',
        color: 'white',
        fontFamily: "'Roboto', sans-serif",
      },
    colorPaletteBtn:{
       border: '1px solid lightgray'
      },
    stylingMenu: {
       margin: '0.5rem',
       padding: '0.5rem',

    },
    fontSelect: {
       height: '10px',
       width: '8rem',
       padding: '12px',
       border: '1px solid lightgray',
       marginTop: '5px',
       borderBottom: 'none', 
       boxShadow: 'none',
       
    },
    menuHeader:{
       fontWeight: '600',
    },
    menuSubHeader:{
        fontSize: '17px',
        color: 'black', 
        fontWeight: '500',
        marginBottom: '0.5rem',
        fontFamily: "'Roboto Condensed', sans-serif",
    },
    palleteBtn:{
        width: '70%',
        height: '25px',
        background: 'blue',
        borderRadius: '0',
        border: '1px solid lightgray',
    },
    paletteItem:{
        marginBottom: '0.8rem',
    },
    inputOptionBtn: {
       border: '1px solid lightgray', 
       padding: '30px 15px',
       marginRight: '1rem',
       textTransform: 'capitalize',
    },
    inputOption:{
       width: '8rem',
       height: '10px',
    },
    inputLabel:{
        textAlign: 'left',
        marginBottom: '-0.5rem',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    MuiInputBaseInput:{
          height: '10px',
      },
}));

  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

export default function LeftSideScreen() {
    const classes = useStyles();

      const theme = useTheme();
      const [state, setState] = React.useState({
        age: '',
        name: 'hai',
      });
    
      const inputLabel = React.useRef(null);
      const [labelWidth, setLabelWidth] = React.useState(0);
      React.useEffect(() => {
        
      }, []);
    
      const handleChange = name => event => {
        setState({
          ...state,
          [name]: event.target.value,
        });
      };
    
  return (
    <div>
        <Grid xs={12} style={{background: 'lightgray', height: '100%', overflow: 'hidden'}}>
           <Grid xs={12} style={{background: 'white'}}>
                <Button className={classes.button} style={{color: 'lightblue'}}>Done</Button>
           </Grid>
                <Paper className ={classes.stylingMenu}>
                   <Typography variant="h5" className={classes.menuHeader}>Theme Styling</Typography>
                        <hr></hr>
                   <Typography variant="h6" className={classes.menuSubHeader}>Fonts</Typography>
                   <Typography variant="h6">primary Font</Typography>
                   <Grid xs={12} style={{marginBottom: '1.5rem'}}>
                   <FormControl className={classes.formControl}>
                        <NativeSelect
                            className={classes.fontSelect}
                            value={state.age}
                            name="age"
                            onChange={handleChange('age')}
                            inputProps={{ 'aria-label': 'age' }}
                        >
                            <option value={10}>Helvetica</option>
                            <option value={20}>Roboto</option>
                        </NativeSelect>
                    </FormControl>
                   </Grid>
                   <Grid xs={12}>
                       <Typography variant="h6" className={classes.menuSubHeader}>Palette</Typography>
                   </Grid>
                   <Grid container spacing={12}>
                       <Grid item xs={4} className={classes.paletteItem}>
                       <Typography>Background Color</Typography>    
                       <Button className={classes.palleteBtn} style={{background: 'white'}}></Button>
                       </Grid>
                       <Grid item xs={4} className={classes.paletteItem}>
                       <Typography>Warning Color</Typography>    
                       <Button className={classes.palleteBtn} style={{background: 'red'}}></Button>
                       </Grid>
                       
                   </Grid>
                   <Grid container spacing={12}>
                       <Grid item xs={4} className={classes.paletteItem}>
                       <Typography>Text Color</Typography>    
                       <Button className={classes.palleteBtn} style={{background: 'black'}}></Button>
                       </Grid>
                       <Grid item xs={4} className={classes.paletteItem}>
                       <Typography>Active Color</Typography>    
                       <Button className={classes.palleteBtn}></Button>
                       </Grid>
                       
                   </Grid>
                   <Grid container spacing={12}>
                       <Grid item xs={4} className={classes.paletteItem}>
                       <Typography>Button Color</Typography>    
                       <Button className={classes.palleteBtn}>

                       </Button>
                       </Grid>
                   </Grid>
                   <Grid xs={12}>
                       <Typography variant="h6" className={classes.menuSubHeader}>Input Options</Typography>
                   </Grid>
                   <Grid container spacing={12}>
                       <Button className={classes.inputOptionBtn}>
                       <form className={classes.container} noValidate autoComplete="off">
                           <div>
                           <Typography variant="h6" style={{textAlign: 'left',}}>Label</Typography>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            style={{width: '8rem', padding: '0'}}
                            label=""
                            margin="normal"
                            variant="outlined"
                        />
                        
                        </div>
                        <Typography variant="h6" style={{textAlign: 'center',}}>(default) rounded </Typography>
                        </form>
                        
                        </Button>
                        <Button className={classes.inputOptionBtn}>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                            <Typography variant="h6" style={{textAlign: 'left',}}>Label</Typography>
                       <TextField
                            id="standard-basic"
                            className={classes.textField}
                            style={{width: '8rem'}}
                            label=""
                            margin="normal"
                        />
                        </div>
                        <Typography variant="h6" style={{textAlign: 'center',}}>Linear </Typography>
                        </form>
                        </Button>
                   </Grid>
                   
               </Paper>
           
        </Grid>
        
    </div>
  );
}