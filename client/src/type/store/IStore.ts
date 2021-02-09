import IAuthInitialState from './IAuth';
import IClientInitialState from './IClient';
import IMasterInitialState from "./IMaster";

export default interface IStore {
    auth: IAuthInitialState,
    client: IClientInitialState,
    master: IMasterInitialState,
}