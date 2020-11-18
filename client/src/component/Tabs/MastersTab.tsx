import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import MasterDataPanel from '../DataPanel/MasterDataPanel';
import { cityById } from '../../helpers/dataProcessing';
import MastersTable from './Tables/MastersTable';
import DeleteDialog from './DeleteDialog';
import {ICity, IMaster} from "../../interfaces";

interface IMastersTab {
    masters: IMaster[],
    cities: ICity[],
    fetchMasters(): void,
    addMaster(master: IMaster): void,
    editMaster(master: IMaster): void,
    deleteMaster(id: number): void,
}

const MastersTab: React.FC<IMastersTab> = (props) => {
    const [masterEdit, setMasterEdit] = useState<IMaster>({
        name: '',
        cityId: 0,
    });
    const [flag, setFlag] = useState({
        showPanel: false,
        addNew: true,
    });

    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delId, setDelId] = useState<number>(0);

    /* eslint-disable */
    useEffect(() => {
        props.fetchMasters();
    }, []);
    /* eslint-enable */

    const changeMasterName = (name: string) => setMasterEdit({ ...masterEdit, name: name });
    const handleSelectCity = (id: number) => setMasterEdit({ ...masterEdit, cityId: id });
    const handleAddButton = () => setFlag({ showPanel: true, addNew: true });

    const handleMasterSave = (event: React.MouseEvent) => {
        event.preventDefault();
        if (masterEdit.name.length >=3 && masterEdit.cityId) {
            if (flag.addNew) {
                props.addMaster(masterEdit);
            } else {
                props.editMaster(masterEdit);
            }
            setFlag({ ...flag, showPanel: false });
            setMasterEdit({ name: '', cityId: 0 });
        }
    };

    const handleMasterCancel = (event: React.MouseEvent) => {
        event.preventDefault();
        setFlag({ ...flag, showPanel: false });
        setMasterEdit({ name: '', cityId: 0 });
    };

    const clickEdit = (id: number) => {
        props.masters.forEach((master) => {
            if (master.id === id) {
                setMasterEdit(master);
            }
        });
            setFlag({ showPanel: true, addNew: false });
    };

    const masterDelete = () => props.deleteMaster(delId);

    const clickDel = (id: number) => {
        setDelId(id);
        setShowDelDialog(true);
    };

    const deleteDialog = () => {
        if (showDelDialog) {
            return (
                <DeleteDialog
                    context={contextMaster()}
                    setDelete={setShowDelDialog}
                    deleteEntry={masterDelete}
                />
            )
        } else {
            return null
        }
    };

    const contextMaster = () => {
        let context = '';
        props.masters.forEach((master) => {
            if (master.id === delId) context = `id:${master.id} ${master.name}`
        });
        return context;
    };


    const mastersTablesArr = () => {
        if (props.masters[0]) {
            return props.masters.map((master) => {
                return ({
                    id: master.id,
                    name: master.name,
                    rating: master.rating,
                    city: cityById(master.cityId, props.cities),
                })
            })
        }
        return []
    };

    const showPanelOrList = () => {
        if (flag.showPanel) {
            return (
                <MasterDataPanel
                    masterEdit={masterEdit}
                    changeMasterName={changeMasterName}
                    handleSelectCity={handleSelectCity}
                    handleMasterSave={handleMasterSave}
                    handleMasterCancel={handleMasterCancel}

                    arrCity={props.cities}
                    addNew={flag.addNew}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <AddButton
                        nameAdd='мастера'
                        handleButton={handleAddButton}
                    />
                    <MastersTable
                        listArr={mastersTablesArr()}
                        clickEdit={clickEdit}
                        clickDel={clickDel}
                    />
                </React.Fragment>
            )
        }
    };

    return (
        <React.Fragment>
            {showPanelOrList()}
            {deleteDialog()}
        </React.Fragment>
    );
};

export default MastersTab;