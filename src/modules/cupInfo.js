// material, size, strow, price, image 

import { useState, createContext } from "react"

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [ cupInfo, setCupInfo] = useState({
        material : "플라스틱",
        size : "중",
        strow : "사용",
        price : 20000,
        image : null
    })
    const value = {
        state : cupInfo,
        action : setCupInfo
    }

    return <DataContext.Provider value={value}>{ children }</DataContext.Provider>
}

const { Consumer : DataConsumer } = DataContext;

export { DataProvider, DataConsumer };
export default DataContext;

