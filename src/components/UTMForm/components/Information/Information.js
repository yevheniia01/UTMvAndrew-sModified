import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "10px",
        marginBottom: "15px"
    },
    info: {
        fontSize: '14px',
        letterSpacing: '-0.05px',
        lineHeight: '21px'
    }
}));

const Information = props => {
    const { className } = props

    const classes = useStyles();

    return (
        <Grid item xs container direction="column" justify="space-between" spacing={2}>
            <Grid item xs className={classes.root}>
                <Typography
                    className={classes.info}
                >
                    <i>Enter your information below to build your Adobe Analytics UTM link.</i>
                </Typography>
                <Typography
                    className={classes.info}
                >
                    <i><b>IMPORTANT:</b> you will need to implement these settings in Adobe to read your created UTMs.</i> <i>For more help, please contact</i>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Information;