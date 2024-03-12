import {atom,selector} from 'recoil';
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userAtom = atom({
    key:"userAtom",
    default:{
        user:[],
    },
    effects_UNSTABLE: [persistAtom],


})

export const postAtom = atom({
    key:"postAtom",
    default:{
        posts:[],
    },
    effects_UNSTABLE: [persistAtom],

})

export const followAtom = atom({
    key:"followAtom",
    default:{
        follow:false
    },
    effects_UNSTABLE: [persistAtom],

})

export const sharePostAtom = atom ({
    key:"sharePostAtom",
    default:{
        value:false
    }
})

export const infoCardAtom = atom({
    key:"infoCardAtom",
    default:{
        value:{},
    }
})