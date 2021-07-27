import React, { FC, Fragment, useEffect, useState } from 'react';
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Items } from '../../GameCalculatorType';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import clsx from 'clsx';

export type ConfirmDialogType = {
    Key: string,
    ReturnValue: Items[],
    IsOpen: boolean,
}

interface IProps {
    confirmDialogValues: ConfirmDialogType,
    setConfirmDialogValues: any,
    handleConfirmDialog: (key: string, returnValue: Items[]) => void
}

const ConfirmDialog: FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const [items, setItems] = useState<Items[]>([]);
    const [loading, setLoading] = useState<boolean>(() => false);
    const [selectedItems, setSelectedItems] = useState<Items[]>([]);

    useEffect(() => {
        setSelectedItems([]);
        const fillUserSession = async () => {
            try {
                setLoading(true);
                axios.get(`https://zt5r022dq9.execute-api.ap-southeast-2.amazonaws.com/default/getitems`)
                    .then(res => {
                        const items = JSON.parse(res.data.body);
                        setItems(items as Items[]);
                        setLoading(false);
                    });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fillUserSession();
    }, []);

    const handleImageClick = (key: Items) => {
        let tempItems = [...selectedItems];

        let obj = tempItems.filter(x => x.Item === key.Item);

        if (obj.length) {
            setSelectedItems(tempItems.filter(x => x.Item !== key.Item));
            return;
        }

        if (selectedItems.length > 5) return;
        tempItems.push(key);
        setSelectedItems(tempItems);
    }

    return (
        <Dialog open={props.confirmDialogValues.IsOpen} classes={{ paper: classes.dialog }} data-testid="confirm-dialog" fullWidth>
            <DialogContent className={classes.dialogContent}>
                {
                    loading ? (
                        <div>Loading</div>
                    )
                        : (
                            <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                                {
                                    items.map(item => (
                                        <ImageListItem
                                            key={item.Item}
                                            cols={1}
                                            className={clsx(classes.image, {
                                                [classes.selectedImage]: selectedItems.filter(x => x.Item === item.Item)?.length > 0
                                            })}
                                        >
                                            <img
                                                src={item.Url}
                                                alt={item.Item}
                                                onClick={() => handleImageClick(item)}

                                            />
                                        </ImageListItem>
                                    ))
                                }
                            </ImageList>
                        )
                }
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        props.setConfirmDialogValues({ ...props.confirmDialogValues, IsOpen: false });
                        setSelectedItems([]);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    title="Yes"
                    color="primary"
                    onClick={() => {
                        props.handleConfirmDialog(props.confirmDialogValues.Key, selectedItems);
                        setSelectedItems([]);
                    }}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        color: theme.palette.secondary.main,
        '&:hover': {
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: '100%',
        height: '100%',
    },
    image: {
        
    },
    selectedImage: {
        border: '5px solid #fa8000'
    },
    '.MuiImageListItem-item': {
        height: 'unset',
    }
}));

export default ConfirmDialog;
