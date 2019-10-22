import React from 'react';
import { makeStyles } from '@material-ui/styles';
import logo from '../../../../assets/images/logos/procter_and_gamble_logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        height: 160,
        width: 160,
        border: '1px solid black',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        margin: '1em 0',
        borderRadius: '50%'
    },
    helper: {
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle'
    },
    orgLogo: {
        verticalAlign: 'middle',
        maxWidth: 125
    }
}));

const OrganizationLogo = props => {
    const { className } = props

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.helper}></span>
            <img
                className={classes.orgLogo}
                alt="Logo"
                src={logo}
            />
        </div>
    );
}

export default OrganizationLogo;