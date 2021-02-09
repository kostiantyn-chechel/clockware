import IAuthInitialState from './IAuth';
import IClientInitialState from './IClient';

export default interface IStore {
    auth: IAuthInitialState,
    client: IClientInitialState,
}