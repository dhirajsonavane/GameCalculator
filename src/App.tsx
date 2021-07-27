import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog, { ConfirmDialogType } from './components/Dialog/ConfirmDialog';
import Portrait_Placeholder from './assets/images/Portrait_Placeholder.png';
import { GameCalculatorReducer } from './GameCalculatorReducer';
import { GameCalculatorActionKind, GameCalculatorType, Items, Set } from './GameCalculatorType';
import { CssBaseline, FormLabel } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CustomSlider from './components/Slider/CustomSlider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';

const placeHolderImageItem = { Item: '', Url: Portrait_Placeholder } as Items;

const initialState = {
  set1: {
    item1: placeHolderImageItem,
    item2: placeHolderImageItem,
    item3: placeHolderImageItem,
    item4: placeHolderImageItem,
    item5: placeHolderImageItem,
    item6: placeHolderImageItem,
  } as Set,
  set2: {
    item1: placeHolderImageItem,
    item2: placeHolderImageItem,
    item3: placeHolderImageItem,
    item4: placeHolderImageItem,
    item5: placeHolderImageItem,
    item6: placeHolderImageItem,
  } as Set,
  armour: null,
  gametime: null,
  rating: null
} as GameCalculatorType

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(GameCalculatorReducer, initialState);
  const [selectedRdo, setSelectedRdo] = useState('armr');

  const [confirmDialogValues, setConfirmDialogValues] = useState<ConfirmDialogType>({
    Key: '',
    IsOpen: false,
    ReturnValue: []
  });

  const onDialogClick = (key: string, returnValue: Items[]) => {
    setConfirmDialogValues({
      ...confirmDialogValues,
      IsOpen: false,
    });

    let selectedItems = [] as Items[];
    returnValue.map(item => {
      selectedItems.push(item);
    });

    for (let i = selectedItems.length; i < 6; i++) {
      selectedItems.push(placeHolderImageItem);
    }

    dispatch({ type: key === 'set1' ? GameCalculatorActionKind.UPDATE_STATE1 : GameCalculatorActionKind.UPDATE_STATE2, payload: selectedItems });
  }

  const renderItem = (key: string, item: Items) => {
    return (
      <Grid item xs={2}>
        <Paper className={classes.paper} elevation={0}>
          <img
            src={item.Url}
            className={classes.itemImg}
            onClick={() => {
              setConfirmDialogValues({
                ...confirmDialogValues,
                Key: key,
                ReturnValue: [],
                IsOpen: true,
              });
            }}
          />
        </Paper>
      </Grid>
    )
  }

  const renderRdoSlider = (key: string, title: string) => {
    return (
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid item xs={12} style={{ display: 'flex' }}>
              <Grid item xs={4} sm={3} md={2}>
                <Radio
                  checked={selectedRdo === key}
                  onChange={handleChange}
                  value={key}
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': key }}
                />
                <span>{title}</span>
              </Grid>
              <Grid item xs={8} sm={9} md={10} className={classes.CustomSliderContainer}>
                <CustomSlider
                  valueLabelDisplay="auto"
                  aria-label="slider"
                  defaultValue={0}
                  disabled={selectedRdo !== key}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRdo(event.target.value);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {renderItem('set1', state.set1?.item1)}
                    {renderItem('set1', state.set1?.item2)}
                    {renderItem('set1', state.set1?.item3)}
                    {renderItem('set1', state.set1?.item4)}
                    {renderItem('set1', state.set1?.item5)}
                    {renderItem('set1', state.set1?.item6)}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {renderItem('set2', state.set2?.item1)}
                    {renderItem('set2', state.set2?.item2)}
                    {renderItem('set2', state.set2?.item3)}
                    {renderItem('set2', state.set2?.item4)}
                    {renderItem('set2', state.set2?.item5)}
                    {renderItem('set2', state.set2?.item6)}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <CardContent>
              <Grid container>
                {renderRdoSlider('armr', 'ARMR')}
                {renderRdoSlider('rating', "RATING")}
                {renderRdoSlider('time', 'GAME TIME')}
              </Grid>
            </CardContent>
          </Card>
        </div>

        <ConfirmDialog
          confirmDialogValues={confirmDialogValues}
          setConfirmDialogValues={setConfirmDialogValues}
          handleConfirmDialog={(key: string, returnValue: Items[]) => onDialogClick(key, returnValue)}
        />
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      flexDirection: 'column',
    },
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    itemImg: {
      width: '100%',
      height: '100%'
    },
    CustomSliderContainer: {
      marginLeft: 10,
      paddingTop: 5,
    },
    card:{
      marginTop: 10,
    }
  }),
);

export default App;
