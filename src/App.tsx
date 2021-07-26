import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog, { ConfirmDialogType } from './components/Dialog/ConfirmDialog';
import Portrait_Placeholder from './assets/images/Portrait_Placeholder.png';
import { GameCalculatorReducer } from './GameCalculatorReducer';
import { GameCalculatorType, Set } from './GameCalculatorType';

const initialState = {
  set1: {
    item1: Portrait_Placeholder,
    item2: Portrait_Placeholder,
    item3: Portrait_Placeholder,
    item4: Portrait_Placeholder,
    item5: Portrait_Placeholder,
    item6: Portrait_Placeholder,
  } as Set,
} as GameCalculatorType

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(GameCalculatorReducer, initialState);

  const [confirmDialogValues, setConfirmDialogValues] = useState<ConfirmDialogType>({
    Key: '',
    IsOpen: false,
    ReturnValue: ''
  });

  const onDialogClick = (key: string, returnValue: string) => {
    console.log(key);
    console.log(returnValue);
  }

  const renderItem = (key: string, item: any) => {
    return (
      <Grid item xs={2}>
        <Paper className={classes.paper}>
          <img
            src={item}
            className={classes.itemImg}
            onClick={() => {
              setConfirmDialogValues({
                ...confirmDialogValues,
                Key: key,
                ReturnValue: item,
                IsOpen: true,
              });
            }}
          />
        </Paper>
      </Grid>
    )
  }

  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container spacing={3}>
          {renderItem('item1', state.set1?.item1)}
          {renderItem('item1', state.set1?.item2)}
          {renderItem('item1', state.set1?.item3)}
          {renderItem('item1', state.set1?.item4)}
          {renderItem('item1', state.set1?.item5)}
          {renderItem('item1', state.set1?.item6)}
        </Grid>
      </div>
      <ConfirmDialog
        confirmDialogValues={confirmDialogValues}
        setConfirmDialogValues={setConfirmDialogValues}
        handleConfirmDialog={(key: string, returnValue: string) => onDialogClick(key, returnValue)}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    itemImg: {
      width: '100%',
      height: '100%'
    }
  }),
);

export default App;
