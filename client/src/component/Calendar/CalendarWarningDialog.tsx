import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

interface IProp {
    open: boolean
    closeWarningDialog(): void
}
const CalendarWarningDialog: React.FC<IProp> = ({open, closeWarningDialog}: IProp) => {

    const handleCancel = () => closeWarningDialog();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Ошибка выбора времени!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы не можете выбрать дату и время раньше сегодняшней!
                        Вы не можете выбрать время которое уже занято!
                        Выберете другое время или Мастера!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Оk
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CalendarWarningDialog;
