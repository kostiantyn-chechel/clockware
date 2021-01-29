import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "../../containers/Admin/ListMenu/ListMenu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RootStateType} from "../../store/reducers/rootReducer";
import {setOpenMenu} from "../../store/actions/appAction";
import {connect, ConnectedProps} from "react-redux";
import MastersTab from "../Tabs/MastersTab";
import {
    addMaster,
    addMasterMessage,
    deleteMaster,
    editMaster,
    fetchFilterMasters,
    fetchMasters
} from "../../store/actions/adminAction";
import {IRegistrationMaster} from "../DataPanel/MasterDataPanel";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    block: {
        minWidth: '620px',
    },
}));

const Masters: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const handleDrawerClose = () => props.setMenuOpen(false);

    return (
        <Container className={classes.block} component="main" maxWidth="xl">
            <MastersTab
                fetchMasters={props.fetchMasters}
                fetchFilterMasters={props.fetchFilterMasters}
                addMaster={props.addMaster}
                addMasterMessage={props.addMasterMessage}
                editMaster={props.editMaster}
                deleteMaster={props.deleteMaster}
                masters={props.masters}
                cities={props.cities}
                massage={props.massage}
            />
            <div className={classes.main}>
                <Drawer
                    anchor={"right"}
                    open={props.openMenu}
                    onClose={handleDrawerClose}
                >
                    <ListMenu
                        handleDrawerClose={handleDrawerClose}
                    />
                </Drawer>
            </div>
        </Container>

    );
};

function mapStateToProps(state: RootStateType) {
    return {
        openMenu: state.app.openMenu,
        masters: state.admin.masters,
        cities: state.admin.cities,
        massage: state.admin.massage,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
        fetchMasters: () => dispatch(fetchMasters()),
        fetchFilterMasters: (name: string) => dispatch(fetchFilterMasters(name)),
        addMaster: (master: IRegistrationMaster) => dispatch(addMaster(master)),
        editMaster: (master: IRegistrationMaster) => dispatch(editMaster(master)),
        deleteMaster: (masterId: number) => dispatch(deleteMaster(masterId)),
        addMasterMessage: (massage: string) => dispatch(addMasterMessage(massage)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Masters);

type PropsFromRedux = ConnectedProps<typeof connector>