import React from 'react';
import clsx from 'clsx';
import classNames from "classnames";
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OrganizationLogo from '../../../UTMForm/components/OrganizationLogo'
import Title from '../../../UTMForm/components/Title';
import Information from '../../../UTMForm/components/Information';

const useStyles = makeStyles(theme => ({


}))

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  export default function RightSideScreen() {
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
            <Grid container spacing={12}>
                <Grid item xs={2}></Grid>

                <Grid item xs={2}>
                    <OrganizationLogo />
                </Grid>

                <Grid item xs={8} style={{padding: '3rem', paddingLeft: '1rem'}}>
                    <Title />
                </Grid>

                <Grid item xs={2}></Grid>
                
                <Grid item xs={10}>
                    <Information />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} style={{marginBottom: '1.5rem'}}>
                <Typography variant="h4">Question 1</Typography>
                <Typography variant="subtitle2">This is the question's help text</Typography>
                <Input
                    placeholder="Active color answer"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    style={{width: '90%',}}
                />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} style={{marginBottom: '15rem'}}>
                <FormControl className={classes.formControl}>
                <Typography variant="h4">Question 2</Typography>
                <Typography variant="subtitle2">This is the question's help text</Typography>
                    <NativeSelect
                        className={classes.selectEmpty}
                        value={state.age}
                        name="age"
                        onChange={handleChange('age')}
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="" disabled>First Choice</option>
                        <option value={10}>First Choice</option>
                        <option value={20}>Second Choice</option>
                    </NativeSelect>
                </FormControl>
                </Grid>
                <Grid item xs={2}></Grid>
                   <Grid item xs={10}>
                        <Button variant="outlined" className={classes.button} style={{width: '90%'}}>GENERATE URL</Button>
                   </Grid>
            </Grid>
            

        </div>
    )
  }