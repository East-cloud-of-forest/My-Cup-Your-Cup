import { useContext } from "react"
import { ModalsDispatchContext, ModalsStateContext } from "./ModalsContext"

const Modals = () => {
    const openedModals = useContext(ModalsStateContext);
    const { close } = useContext(ModalsDispatchContext);

    return openedModals.map( (modal, index) => {
        const { Component, props } = modal;
        const onClose = () => {
            close(Component);
            };
        return <Component key={index} {...props} onClose={onClose} />;
    });
}

export default Modals;