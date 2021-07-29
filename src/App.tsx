import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog, { ConfirmDialogType } from './components/Dialog/ConfirmDialog';
import Portrait_Placeholder from './assets/images/Portrait_Placeholder.png';
import { GameCalculatorReducer } from './GameCalculatorReducer';
import { GameCalculatorActionKind, GameCalculatorType, Items, KeyStoneType, RunesType, Set, SummonersType } from './GameCalculatorType';
import { CssBaseline, FormLabel, IconButton } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CustomSlider from './components/Slider/CustomSlider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import Chart from "react-google-charts";
import { url } from 'inspector';
import axios from 'axios';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';

const placeHolderImageItem = { Item: '', Url: Portrait_Placeholder } as Items;

const initialState = {
  set1: {
    item1: placeHolderImageItem,
    item2: placeHolderImageItem,
    item3: placeHolderImageItem,
    item4: placeHolderImageItem,
    item5: placeHolderImageItem,
    item6: placeHolderImageItem,
    keystone: '',
    summoner: '',
    runes: []
  } as Set,
  set2: {
    item1: placeHolderImageItem,
    item2: placeHolderImageItem,
    item3: placeHolderImageItem,
    item4: placeHolderImageItem,
    item5: placeHolderImageItem,
    item6: placeHolderImageItem,
    keystone: '',
    summoner: '',
    runes: []
  } as Set,
  armour: null,
  gametime: null,
  rating: null,
} as GameCalculatorType

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(GameCalculatorReducer, initialState);
  const [selectedRdo, setSelectedRdo] = useState('armour');
  const [keyStones, setKeyStones] = useState<KeyStoneType[]>([]);
  const [summoners, setSummoners] = useState<SummonersType[]>([]);
  const [runes1, setRunes1] = useState<RunesType[]>([]);
  const [runes2, setRunes2] = useState<RunesType[]>([]);

  const [confirmDialogValues, setConfirmDialogValues] = useState<ConfirmDialogType>({
    Key: '',
    IsOpen: false,
    ReturnValue: []
  });

  useEffect(() => {
    const fillKeyStones = async () => {
      try {
        axios.get(`https://zt5r022dq9.execute-api.ap-southeast-2.amazonaws.com/default/getkeystones`)
          .then(res => {
            const items = JSON.parse(res.data.body);
            setKeyStones(items as KeyStoneType[]);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const fillSummoners = async () => {
      try {
        axios.get(`https://zt5r022dq9.execute-api.ap-southeast-2.amazonaws.com/default/getsummoners`)
          .then(res => {
            const items = JSON.parse(res.data.body);
            setSummoners(items as SummonersType[]);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const fillRunes = async () => {
      try {
        axios.get(`https://zt5r022dq9.execute-api.ap-southeast-2.amazonaws.com/default/getbuttonassets`)
          .then(res => {
            const items = JSON.parse(res.data.body);
            let runes = [] as RunesType[];
            items.map((item: any, i: number) => {
              runes.push({ ...item, Id: i + 1 })
            })
            setRunes1(runes);
            setRunes2(runes);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fillSummoners();
    fillKeyStones();
    fillRunes();
  }, []);

  useEffect(() => {
    let data = {
      set1: {
        item1: state.set1.item1.Item,
        item2: state.set1.item2.Item,
        item3: state.set1.item3.Item,
        item4: state.set1.item4.Item,
        item5: state.set1.item5.Item,
        item6: state.set1.item6.Item,
        keystone: state.set1.keystone,
        summoner: state.set1.summoner,
        runes: state.set1.runes,
      } as any,
      set2: {
        item1: state.set2.item1.Item,
        item2: state.set2.item2.Item,
        item3: state.set2.item3.Item,
        item4: state.set2.item4.Item,
        item5: state.set2.item5.Item,
        item6: state.set2.item6.Item,
        keystone: state.set2.keystone,
        summoner: state.set2.summoner,
        runes: state.set2.runes,
      } as any,
      armour: state.armour,
      rating: state.rating,
      gametime: state.gametime
    } as any;

    console.log(data);
  }, [state]);

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

  const handleSlider = (key: string, newValue: number | number[]) => {
    switch (key) {
      case 'armour':
        dispatch({ type: GameCalculatorActionKind.ARMOUR, payload: newValue });
        break;
      case 'rating':
        dispatch({ type: GameCalculatorActionKind.RATING, payload: newValue });
        break;
      case 'gametime':
        dispatch({ type: GameCalculatorActionKind.GAMETIME, payload: newValue });
        break;
      default:
        break;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRdo(event.target.value);

    switch (event.target.value) {
      case 'armour':
        dispatch({ type: GameCalculatorActionKind.ARMOUR, payload: null });
        break;
      case 'rating':
        dispatch({ type: GameCalculatorActionKind.RATING, payload: null });
        break;
      case 'gametime':
        dispatch({ type: GameCalculatorActionKind.GAMETIME, payload: null });
        break;
      default:
        break;
    }
  };

  const toggleRunes = (key: string, id: number) => {
    switch (key) {
      case 'set1':
        let ru1 = runes1.map(item => item.Id !== id ? { ...item } : { ...item, IsSelected: !item.IsSelected });
        setRunes1(ru1);

        dispatch({
          type: GameCalculatorActionKind.RUNES1, payload: ru1.filter(x => x.IsSelected).map(y => y.Button)
        })
        break;
      case 'set2':
        let ru2 = runes2.map(item => item.Id !== id ? { ...item } : { ...item, IsSelected: !item.IsSelected });
        setRunes2(ru2);

        dispatch({
          type: GameCalculatorActionKind.RUNES2, payload: ru2.filter(x => x.IsSelected).map(y => y.Button)
        })
        break;
      default:
        break;
    }
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

  const renderRdoSlider = (key: string, title: string, maxValue: number) => {
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
                  max={maxValue}
                  valueLabelDisplay={selectedRdo !== key ? "on" : "off"}
                  aria-label="slider"
                  defaultValue={0}
                  value={(key === 'armour' ? state.armour : (key === 'rating' ? state.rating : state.gametime))}
                  disabled={selectedRdo == key}
                  onChange={(event: any, newValue: number | number[]) => handleSlider(key, newValue)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderKeyStone = (key: string) => {
    return (
      <Autocomplete
        id={key}
        options={keyStones}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option: KeyStoneType) => option.Keystone}
        renderOption={(option: KeyStoneType) => (
          <React.Fragment>
            <img src={option.Url} width={30} />
            {option.Keystone}
          </React.Fragment>
        )}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField
            {...params}
            label="KeyStone"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
        onChange={(event: React.ChangeEvent<{}>, value: KeyStoneType | null) => {
          switch (key) {
            case 'keystone1':
              dispatch({ type: GameCalculatorActionKind.KEYSTONE1, payload: value?.Keystone });
              break;
            case 'keystone2':
              dispatch({ type: GameCalculatorActionKind.KEYSTONE2, payload: value?.Keystone });
              break;
            default:
              break;
          }
        }}
      />
    )
  }

  const renderSummoner = (key: string) => {
    return (
      <Autocomplete
        id={key}
        options={summoners}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option: SummonersType) => option.Summoners}
        renderOption={(option: SummonersType) => (
          <React.Fragment>
            <img src={option.Url} width={30} />
            {option.Summoners}
          </React.Fragment>
        )}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField
            {...params}
            label="Summoner"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
        onChange={(event: React.ChangeEvent<{}>, value: SummonersType | null) => {
          switch (key) {
            case 'summoner1':
              dispatch({ type: GameCalculatorActionKind.SUMMONER1, payload: value?.Summoners });
              break;
            case 'summoner2':
              dispatch({ type: GameCalculatorActionKind.SUMMONER2, payload: value?.Summoners });
              break;
            default:
              break;
          }
        }}
      />
    )
  }

  const renderRunes = (key: string) => {
    const ru = (key === 'set1' ? runes1 : runes2);
    return (
      <div className={classes.runes}>
        {
          ru.length > 0 && (
            ru.map(rune => (
              <Avatar
                onClick={() => toggleRunes(key, rune.Id)}
                key={rune.Button}
                alt={rune.Button}
                className={classes.runesAvatar}
                src={
                  ((key === 'set1' && state.set1.runes?.includes(rune.Button)) || (key === 'set2' && state.set2.runes?.includes(rune.Button))
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHTfj4rpfo35KCLe8P_QUcy_EThBOWFRo42w&usqp=CAU"
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStvmnrfrTilGGMvu33dOi7OiFDffNiZED2dQ&usqp=CAU")
                }
              />
            ))
          )
        }
      </div>
    )
  }

  return (
    <div className={`App ${classes.bgImg}`}>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>

              <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                  <Grid container spacing={1}>
                    {renderItem('set1', state.set1?.item1)}
                    {renderItem('set1', state.set1?.item2)}
                    {renderItem('set1', state.set1?.item3)}
                    {renderItem('set1', state.set1?.item4)}
                    {renderItem('set1', state.set1?.item5)}
                    {renderItem('set1', state.set1?.item6)}
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={3} md={2} className={classes.keystone}>
                  {renderKeyStone('keystone1')}
                </Grid>
                <Grid item xs={6} sm={3} md={2} className={classes.summoner}>
                  {renderSummoner('summoner1')}
                </Grid>
                <Grid item xs={6} sm={12} md={4}>
                  {renderRunes('set1')}
                </Grid>
              </Grid>

              <Grid container style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Grid container spacing={1}>
                    {renderItem('set2', state.set2?.item1)}
                    {renderItem('set2', state.set2?.item2)}
                    {renderItem('set2', state.set2?.item3)}
                    {renderItem('set2', state.set2?.item4)}
                    {renderItem('set2', state.set2?.item5)}
                    {renderItem('set2', state.set2?.item6)}
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={3} md={2} className={classes.keystone}>
                  {renderKeyStone('keystone2')}
                </Grid>
                <Grid item xs={6} sm={3} md={2} className={classes.summoner}>
                  {renderSummoner('summoner2')}
                </Grid>
                <Grid item xs={6} sm={12} md={4}>
                  {renderRunes('set2')}
                </Grid>
              </Grid>

            </CardContent>
          </Card>

          <Card className={classes.card}>
            <CardContent>
              <Grid container style={{ marginTop: 20 }}>
                {renderRdoSlider('armour', 'ARMOUR', 400)}
                {renderRdoSlider('rating', "RATING", 10)}
                {renderRdoSlider('gametime', 'GAME TIME', 20)}
              </Grid>
            </CardContent>
          </Card>

          <Card className={classes.card} style={{ marginBottom: 50 }}>
            <CardContent>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{ overflowX: 'auto' }}>

                  <Chart
                    style={{ alignContent: 'center' }}
                    width={'600px'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['x', 'game'],
                      [0, 0],
                      [1, 10],
                      [2, 23],
                      [3, 17],
                      [4, 18],
                      [5, 9],
                      [6, 11],
                      [7, 27],
                      [8, 33],
                      [9, 40],
                      [10, 32],
                      [11, 35],
                    ]}
                    options={{
                      hAxis: {
                        title: 'Time',
                      },
                      vAxis: {
                        title: 'Popularity',
                      },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                  />

                </Grid>
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
      minHeight: '100vh'
    },
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    itemImg: {
      width: 55,
    },
    CustomSliderContainer: {
      marginLeft: 10,
      paddingTop: 5,
    },
    card: {
      marginTop: 10,
    },
    bgImg: {
      backgroundImage: "url('https://images.unsplash.com/photo-1578364249730-0c4ee16426fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80')",
    },
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
    keystone: {
      paddingLeft: 7,
    },
    summoner: {
      paddingLeft: 3,
    },
    runes: {
      display: 'flex',
      '& > *': {
        margin: 5,
        [theme.breakpoints.down('xs')]: {
          margin: 3,
        }
      }
    },
    runesAvatar: {
      [theme.breakpoints.down('xs')]: {
        width: 32,
        heightt: 32
      }
    }
  }),
);

export default App;
function clsx(arg0: string, arg1: { [x: number]: boolean; }): string | undefined {
  throw new Error('Function not implemented.');
}
