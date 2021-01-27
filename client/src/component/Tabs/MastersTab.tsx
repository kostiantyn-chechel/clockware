import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import MasterDataPanel, { IRegistrationMaster } from '../DataPanel/MasterDataPanel';
import { cityById } from '../../helpers/dataProcessing';
import MastersTable from './Tables/MastersTable';
import DeleteDialog from './DeleteDialog';
import { IMastersTab, IMaster } from "../../interfaces";
import SearchComboBox from "../SearchComboBox/SearchComboBox";

export type MasterTableType = {id: number, name: string, rating: number, city: string}

const ZERO_MASTER = {
    id: 0,
    name: '',
    login: '',
    cityId: 0,
    rating: 0,
    review: [],
};

const MastersTab: React.FC<IMastersTab> = (props) => {
    const [masterEdit, setMasterEdit] = useState<IMaster>(ZERO_MASTER);
    const [flag, setFlag] = useState({ showPanel: false, addNew: true});

    const [filterWord, setFilterWord] = useState<string | null>(null);
    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delId, setDelId] = useState<number>(0);

    /* eslint-disable */
    useEffect(() => {
        if (filterWord !== '') {
            if (filterWord){
                props.fetchFilterMasters(filterWord);
            } else {
                props.fetchFilterMasters('');
            }
        }
    }, [filterWord]);
    /* eslint-enable */

    const handleMasterAddEdit = (master: IRegistrationMaster) => {
        if (flag.addNew) {
            props.addMaster(master);
            console.log('add master', master)
        } else {
            props.editMaster(master);
            console.log('edit master', master)
        }
        setFlag({ ...flag, showPanel: false });
    };

    const handleMasterCancel = (event: React.MouseEvent) => {
        event.preventDefault();
        setFlag({...flag, showPanel: false});
    };

    const handleAddButton = () => {
        props.addMasterMessage('');
        setMasterEdit(ZERO_MASTER);
        setFlag({ showPanel: true, addNew: true })
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

    const setFilter = (name: string | null) => setFilterWord(name);

    const contextMaster = () => {
        let context = '';
        props.masters.forEach((master) => {
            if (master.id === delId) context = `id:${master.id} ${master.name}`
        });
        return context;
    };

    const mastersTablesArr = (): MasterTableType[] => {
        if (props.masters[0]) {
            return props.masters.map((master): MasterTableType => {

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
                    handleMasterAddEdit={handleMasterAddEdit}
                    handleMasterCancel={handleMasterCancel}
                    message={props.massage}
                    arrCity={props.cities}
                    addNew={flag.addNew}
                />
            );
        } else {
            return (
                <React.Fragment>
                    <AddButton
                        nameAdd='мастера'
                        handleButton={handleAddButton}
                    />
                    <SearchComboBox
                        filterName='masters'
                        setFilter={setFilter}
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