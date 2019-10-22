import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Topbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 70
    }
  },
  shiftContent: {
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: 50,
      paddingRight: 50
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 120,
      paddingRight: 120
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 180,
      paddingRight: 180
    },
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 340,
      paddingRight: 340
    },
    [theme.breakpoints.only('xl')]: {
      paddingLeft: 600,
      paddingRight: 600
    }
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: true
      })}
    >
      <Topbar />
      <main>
        {children}
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
