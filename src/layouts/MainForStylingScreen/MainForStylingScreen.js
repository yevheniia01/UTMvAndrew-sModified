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
      paddingTop: 70,
    }
  },
  shiftContent: {
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: 0,
      paddingRight: 0
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 0,
      paddingRight: 0
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 0,
      paddingRight: 0
    },
    [theme.breakpoints.only('xl')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  content: {
    height: '100%'
  }
}));

const MainForStylingScreen = props => {
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

MainForStylingScreen.propTypes = {
  children: PropTypes.node
};

export default MainForStylingScreen;
