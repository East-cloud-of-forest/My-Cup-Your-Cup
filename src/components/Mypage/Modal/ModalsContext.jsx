import { createContext } from "react";

export const ModalsDispatchContext = createContext({
    // 모달 열고 닫기
    open : () => {},
    close : () => {},
})

export const ModalsStateContext = createContext([]);