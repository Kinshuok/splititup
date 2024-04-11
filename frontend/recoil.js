import { atom } from 'recoil';

export const totalMoneyLentState = atom({
    key: 'totalMoneyLentState',
    default: 0,
});

export const totalMoneyOwedState = atom({
    key: 'totalMoneyOwedState',
    default: 0,
});

export const groupState =atom({
    key:'groupState',
    default: [],
})
