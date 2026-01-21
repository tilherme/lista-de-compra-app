import AsyncStorage from "@react-native-async-storage/async-storage";

import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY ="@compre:ja"

export type ItemStorage = {
    id: string
    status: FilterStatus
    description: string
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
        return storage ? JSON.parse(storage): []
    }catch (error){
       throw new Error("GET_ITEMS:" + error) 
    }
    
}

async function getByStatus(status:FilterStatus):Promise<ItemStorage[]> {
    const items = await get()
    return items.filter((item) => item.status === status)
    
}

async function save(items:ItemStorage[]): Promise<void> {
    try{
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    }catch (error){
       throw new Error("GET_ITEMS:" + error) 

    }
    
}

async function add(newItem:ItemStorage): Promise<ItemStorage[]> {
    const items = await get()
    const updatItems = [...items, newItem]

    await save(updatItems)

    return updatItems
}

async function remove(id: string): Promise<void> {
    const items = await get()
    const updatItems = items.filter((item) => item.id !== id)
    await save(updatItems)
    
}

async function clear(): Promise<void>{
    try {
        AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
        console.log("Clear")

    } catch (error) {
        throw new Error ("Clear_ITEMS" + error)
    }
    
}

async function toogleStatus(id: string): Promise<ItemStorage[]> {
    const items = await get()

    const updatedItems = items.map((items)=>
        items.id === id 
    ? {
        ...items,
        status: 
            items.status === FilterStatus.PENDING 
            ? FilterStatus.DONE
            : FilterStatus.PENDING
    }
    :items
    )
    await save(updatedItems)
    return updatedItems
    
}
export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear,
    toogleStatus,
}