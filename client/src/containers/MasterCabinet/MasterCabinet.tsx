import React  from 'react';
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { RootStateType } from "../../store/reducers/rootReducer";
import { IChangeRegUser } from "../../interfaces";
import { userRegistrationChange } from "../../store/actions/authAction";
import { connect, ConnectedProps } from "react-redux";
import { fetchClientsOrderList } from "../../store/actions/clientAction";
import { getUserStatus, logout, validToken } from "../../helpers/authProcessing";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    orders: {
        width: '80%',
    },
    text: {
        marginTop: theme.spacing(3),
    },
}));

const MasterCabinet: React.FC<PropsFromRedux> = (props) => {
    const { push } = useHistory();
    const classes = useStyles();

    const renderMasterCabinet = () => {
        if (validToken() && getUserStatus() === 'master') {
            return (
                <Container component="main" maxWidth="xl">
                    <div className={classes.orders}>
                        <h1>MASTER DATA</h1>
                        <p>{props.id}</p>
                        <p>{props.name}</p>
                        <p>{props.login}</p>
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
        </React.Fragment>
    );
};

function mapStateToProps(state: RootStateType) {
    return {
        id: state.auth.user.id,
        name: state.auth.user.name,
        login: state.auth.user.login,
    }
}

function mapDispatchToProps(dispatch: any) {
    return{
        userRegistrationChange: (userChangeRegInfo: IChangeRegUser) => dispatch(userRegistrationChange(userChangeRegInfo)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MasterCabinet);

type PropsFromRedux = ConnectedProps<typeof connector>