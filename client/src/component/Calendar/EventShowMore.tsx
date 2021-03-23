import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { TEvent } from '../../containers/Schedule/Schedule';

interface IProp {
    open: boolean
    event: TEvent
    closeShowMore(): void
}

const EventShowMore: React.FC<IProp> = ({ open, event, closeShowMore }: IProp) => {

    return (
        <Dialog
            open={open}
            onClose={()=>console.log('Dialog onClose')}
        >
            <DialogTitle id="alert-dialog-title">{`${event.title}`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    `event.title`
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeShowMore} color="primary">
                    Закрыть
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default EventShowMore;