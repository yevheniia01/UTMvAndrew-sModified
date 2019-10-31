import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import './style.css'
import axios from 'axios';
import config from '../../config/client';
import ToolBar from './components/ToolBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LeftSideScreen from './components/LeftSideScreen';
import RightSideScreen from './components/RightSideScreen'

class UTMStylingScreen extends Component {
    constructor(props){
        super(props);
    }
    render(){
            return(
               
           <Grid>
               <Grid item xs={12}>
               <ToolBar />
               </Grid>
               <Grid container spacing={12}>
               <Grid item xs={4}>
               <LeftSideScreen />
               </Grid> 
               <Grid item xs={8}>
               <RightSideScreen />    
               </Grid>
               </Grid>
            </Grid>
       
        )
    
};
}

export default UTMStylingScreen;

