import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    main: {
        fontWeight: 500,
        fontSize: '40px',
        letterSpacing: '-0.24px',
        lineHeight: '45px'
    },
    secondary: {
        fontWeight: 500,
        fontSize: '30px',
        letterSpacing: '-0.24px',
        lineHeight: '35px'
    }
}));

const Title = props => {
    const { className } = props

    const classes = useStyles();

    return (
        <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <Typography
                    className={classes.main}
                >
                    Neurobion Campaign
                </Typography>
                <Typography
                    className={classes.secondary}
                >
                    Google Analytics
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Title;