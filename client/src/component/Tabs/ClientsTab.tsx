import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import ClientDataPanel from '../DataPanel/ClientDataPanel';
import { isEmail } from '../../helpers/validation';
import ClientsTable from './Tables/ClientsTable';
import DeleteDialog from './DeleteDialog';
import { IClient, IClientsTab } from "../../interfaces";

export type ClientTableType = {id: number, name: string, email: string}

const ClientsTab: React.FC<IClientsTab> = (props) => {
    const [clientEdit, setClientEdit] = useState<IClient>({
        id: 0,
        name: '',
        email: '',
    });
    const [flag, setFlag] = useState({
        showPanel: false,
        addNew: true,
    });

    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delId, setDelId] = useState<number>(0);

    /* eslint-disable */
    useEffect(() => {
        props.fetchClients();
    }, []);
    /* eslint-enable */

    const changeClientName = (name: string) => setClientEdit({ ...clientEdit, name: name });
    const changeClientEmail = (email: string) => setClientEdit({ ...clientEdit, email: email });
    const handleAddButton = () => setFlag({ showPanel: true, addNew: true });

    const handleClientSave = (event: React.MouseEvent) => {
        event.preventDefault();
        if (clientEdit.name.length >= 3 && isEmail(clientEdit.email)) {
            if (flag.addNew) {
                props.addClient(clientEdit);
            } else {
                props.editClient(clientEdit);
            }
            setFlag({ ...flag, showPanel: false });
            setClientEdit({ name: '', email: '' });
        }
    };

    const handleClientCancel = (event: React.MouseEvent) => {
        event.preventDefault();
        setFlag({ ...flag, showPanel: false });
        setClientEdit({ name: '', email: '' });
    };

    const clickEdit = (id: number) => {
        props.clients.forEach((client) => {
            if (client.id === id) {
                setClientEdit(client);
            }
        });
        setFlag({ showPanel: true, addNew: false });
    };


    const clientDelete = () => props.deleteClient(delId);

    const clickDel = (id: number) => {
        setDelId(id);
        setShowDelDialog(true);
    };

    const deleteDialog = () => {
        if (showDelDialog) {
            return (
                <DeleteDialog
                    context={contextClient()}
                    setDelete={setShowDelDialog}
                    deleteEntry={clientDelete}
                />
            )
        } else {
            return null
        }
    };

    const contextClient = () => {
        let context = '';
        props.clients.forEach((client) => {
            if (client.id === delId) context = `id:${client.id} ${client.name}`
        });
        return context;
    };

    const clientsTablesArr = (): ClientTableType[] => {
        if (props.clients[0]) {
            return props.clients.map((client): ClientTableType => {

                return ({
                    id: client.id!,
                    name:client.name,
                    email: client.email,
                })
            })
        }
        return []
    };

    const showPanelOrList = () => {
        if (flag.showPanel) {
            return (
                <ClientDataPanel
                    clientEdit={clientEdit}
                    changeClientName={changeClientName}
                    changeClientEmail={changeClientEmail}
                    handleClientSave={handleClientSave}
                    handleClientCancel={handleClientCancel}
                    addNew={flag.addNew}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <AddButton
                        nameAdd='клиента'
                        handleButton={handleAddButton}
                    />
                    <ClientsTable
                        listArr={clientsTablesArr()}
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

export default ClientsTab;