import {atom,selector} from 'recoil';


export const userAtom = atom({
    key:"userAtom",
    default:{
        user:[],
    }
})
export const postAtom = atom({
    key:"postAtom",
    default:{
        posts:[],
    }
})

export const followAtom = atom({
    key:"followAtom",
    default:{
        follow:false
    }
})
