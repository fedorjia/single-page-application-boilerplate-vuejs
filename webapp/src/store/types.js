import { createActionType } from 'action-types-creator';

export const home = createActionType('home', ['RESET', 'DATA_RECEIVED', 'DATA_ERROR']);
export const cart = createActionType('cart', ['RESET', 'LOAD_DATA', 'REDUCE_PRODUCT', 'ADD_PRODUCT']);
