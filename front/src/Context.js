import { useContext, createContext } from "react";

export const AppContext = createContext(null);

export function UseAppContext() {
    return useContext(AppContext);
}