import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    state: ()=>{
        return {
            ip: '1.2.3.4',
            userId: ''
        }
    }
})