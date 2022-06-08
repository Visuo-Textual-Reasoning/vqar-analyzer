import {useLocalStorage} from './useLocalStorage'

export function useAuth(){
    return useLocalStorage("auth", null)
}