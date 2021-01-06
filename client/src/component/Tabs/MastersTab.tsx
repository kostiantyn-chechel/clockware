import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import MasterDataPanel from '../DataPanel/MasterDataPanel';
import { cityById } from '../../helpers/dataProcessing';
import MastersTable from './Tables/MastersTable';
import DeleteDialog from './DeleteDialog';
import { IMastersTab, IMaster } from "../../interfaces";
import SearchComboBox from "../SearchComboBox/SearchComboBox";

export type MasterTableType = {id: number, name: string, rating: number, city: string}

const MastersTab: React.FC<IMastersTab> = (props) => {
    const [masterEdit, setMasterEdit] = useState<IMaster>({
        id: 0,
        name: '',
        cityId: 0,
        rating: 0,
        review: [],
    });
    const [flag, setFlag] = useState({
        showPanel: false,
        addNew: true,
    });

    const [filterWord, setFilterWord] = useState<string | null>(null);
    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delId, setDelId] = useState<number>(0);

    /* eslint-disable */
    // useEffect(() => {
    //     props.fetchMasters();
    // }, []);

    useEffect(() => {
        if (filterWord !== '') {
            if (filterWord){
                props.fetchFilterMasters(filterWord);
                console.log('fetchFilterMasters', filterWord)
            } else {
                props.fetchFilterMasters('');
                console.log('fetchFilterMasters', "'___'")
            }
        }
    }, [filterWord]);
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
            setMasterEdit({
                id: 0,
                name: '',
                cityId: 0,
                rating: 0,
                review: [], });
        }
    };

    const handleMasterCancel = (event: React.MouseEvent) => {
        event.preventDefault();
        setFlag({ ...flag, showPanel: false });
        setMasterEdit({
            id: 0,
            name: '',
            cityId: 0,
            rating: 0,
            review: [], });
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

    const setFilter = (name: string | null) => {
        // console.log('name', name);
        setFilterWord(name);
    };

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