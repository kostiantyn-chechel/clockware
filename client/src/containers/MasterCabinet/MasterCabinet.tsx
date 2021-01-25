import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { RootStateType } from "../../store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { getUserStatus, logout, validToken } from "../../helpers/authProcessing";
import { useHistory } from "react-router-dom";
import { getMasterOrders } from "../../store/actions/masterAction";
import MasterOrdersTable from "../../component/MasterCabinet/MasterOrdersTable";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
    orders: {
        width: '100%',
    },
    text: {
        marginTop: theme.spacing(3),
    },
    img: {
        maxWidth: '80%',
        maxHeight: '80%',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const MasterCabinet: React.FC<PropsFromRedux> = (props) => {
    const { push } = useHistory();
    const classes = useStyles();
    const { id, name, login } = props;

    /* eslint-disable */
    useEffect(() => {
        props.getMasterOrders(props.id);
    },[id]);
    /* eslint-enable */

    const [urlPhoto, setUrlPhoto] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setUrlPhoto('');
        setOpen(false);
    };
    const handleToggle = (url: string): void => {
        setUrlPhoto(url);
        setOpen(!open);
    };

    const renderMasterCabinet = () => {
        if (validToken() && getUserStatus() === 'master') {
            return (
                <Container component="main" maxWidth="xl">
                    <div className={classes.orders}>
                        <h1>{`(${id}): ${name} (${login}) `}</h1>
                        <MasterOrdersTable
                            orders={props.orders}
                            handleToggle={handleToggle}
                        />
                    </div>
                </Container>
            )
        } else {
            logout();
            push('/auth');
            return null
        }
    };

    return (
        <React.Fragment>
            {renderMasterCabinet()}
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                {/* eslint-disable */}
                <img src={urlPhoto} className={classes.img}/>
                {/* eslint-enable */}
            </Backdrop>
        </React.Fragment>
    );
};

function mapStateToProps(state: RootStateType) {
    return {
        id: state.auth.user.id,
        name: state.auth.user.name,
        login: state.auth.user.login,
        orders: state.master.orders,
    }
}

function mapDispatchToProps(dispatch: any) {
    return{
        getMasterOrders: (id: number) => dispatch(getMasterOrders(id)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MasterCabinet);

type PropsFromRedux = ConnectedProps<typeof connector>