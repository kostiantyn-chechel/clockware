import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

interface IDeleteDialog {
    context: string,
    setDelete(flag: boolean): void,
    deleteEntry(): void,
}

const DeleteDialog: React.FC<IDeleteDialog> = (props) => {
    const { context, setDelete, deleteEntry } = props;
    const [open, setOpen] = React.useState(true);

    const handleDeleteCancel = () => {
        setOpen(false);
        setDelete(false);
    };

    const handleDeleteConfirm = () => {
        setOpen(false);
        setDelete(false);
        deleteEntry();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Удаление записи!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы подтверждаете удаление следующей записи: { context } ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteDialog;