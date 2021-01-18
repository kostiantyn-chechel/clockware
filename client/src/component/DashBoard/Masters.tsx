import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "../../containers/Admin/ListMenu/ListMenu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RootStateType} from "../../store/reducers/rootReducer";
import {setOpenMenu} from "../../store/actions/appAction";
import {connect, ConnectedProps} from "react-redux";
import MastersTab from "../Tabs/MastersTab";
import {addMaster, deleteMaster, editMaster, fetchFilterMasters, fetchMasters} from "../../store/actions/adminAction";
import {IMaster} from "../../interfaces";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
}));

const Masters: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const handleDrawerClose = () => props.setMenuOpen(false);

    return (
        <React.Fragment>
            <div>MASTERS</div>
            <MastersTab
                fetchMasters={props.fetchMasters}
                fetchFilterMasters={props.fetchFilterMasters}
                addMaster={props.addMaster}
                editMaster={props.editMaster}
                deleteMaster={props.deleteMaster}
                masters={props.masters}
                cities={props.cities}
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
        </React.Fragment>

    );
};

function mapStateToProps(state: RootStateType) {
    return {
        openMenu: state.app.openMenu,
        masters: state.admin.masters,
        cities: state.admin.cities,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
        fetchMasters: () => dispatch(fetchMasters()),
        fetchFilterMasters: (name: string) => dispatch(fetchFilterMasters(name)),
        addMaster: (master: IMaster) => dispatch(addMaster(master)),
        editMaster: (master: IMaster) => dispatch(editMaster(master)),
        deleteMaster: (masterId: number) => dispatch(deleteMaster(masterId)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Masters);

type PropsFromRedux = ConnectedProps<typeof connector>