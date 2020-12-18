import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AuthGeneral: React.FC = props => {
    const classes = useStyles();
    const { push } =useHistory();

    const handleSubmitAdmin = (event:React.MouseEvent) => {
        event.preventDefault();
        push('/client');
        // window.location.assign('http://localhost:3000/client');
    };

    const handleSubmitClient = (event:React.MouseEvent) => {
        event.preventDefault();
        push('/admin');
        // window.location.assign('http://localhost:3000/admin');
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                    src={process.env.PUBLIC_URL + '/logo_blue.png'}
                    variant='circle'
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
                    onClick={handleSubmitAdmin}
                >
                    Админ
                </Button>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
                    onClick={handleSubmitClient}
                >
                    Kлиент
                </Button>
            </div>
        </Container>
    );
};

export default AuthGeneral;
