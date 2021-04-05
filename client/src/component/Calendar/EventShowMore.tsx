import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ICalendarEvents, TOrderStatus } from '../../interfaces';

interface IProp {
    open: boolean
    event: ICalendarEvents
    closeShowMore(): void
}

const EventShowMore: React.FC<IProp> = ({ open, event, closeShowMore }: IProp) => {

    const orderStatusRU = (status: TOrderStatus): string => {
        switch (status) {
            case 'completed': return 'ГОТОВО';
            case 'inwork': return 'В РАБОТЕ';
            default: return 'В ОЖИДАНИИ';

        }
    };

    return (
        <Dialog
            open={open}
        >
            <DialogTitle id="alert-dialog-title">{`${event.title}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {event.clientName}{event.clientEmail}
                </DialogContentText>
                <DialogContentText>
                    {`${event.start.toLocaleDateString()} с ${event.start.getHours()}:00 по ${event.end.getHours()}:00`}
                </DialogContentText>
                <DialogContentText>
                    {orderStatusRU(event.status)}
                </DialogContentText>
                {/*eslint-disable*/}
                <img src={event.photoURL} width='100' height='100'/>
                {/*eslint-enable*/}

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