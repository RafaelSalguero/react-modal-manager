import * as React from "react";
export interface ModalProps<TValue = any, TResult = any, TParams = any> {
    /**Parametros que se le pasan al modal y que el modal no puede modificar */
    params: TParams;
    /**Valor que almacena el modal y que el modal puede modificar */
    value: TValue;
    /**Indica un cambio en el value */
    onChange: (value: TValue) => void;
    /**Se ejecuta al cerrar el modal */
    onClose: (response: TResult) => void;
}


export interface ModalEntry {
    id: number;
    component: ((props: ModalProps) => JSX.Element) | React.ComponentClass<ModalProps>;
    props: ModalProps;
}
export type ModalList = ModalEntry[];
export interface ModalManagerState {
    modals: ModalList;
    nextId: number;
}

export class ModalManagerComponent extends React.PureComponent<ModalManagerState> {
    render() {
        const x = this.props.modals;
        if (x.length == 0) {
            return null;
        } else {
            //Solo mostramos el ultimo modal, se van a mostrar los demas modales después de que se cierre este
            const { component, props } = x[x.length - 1];
            const Comp = component;

            return <Comp {...props} />
        }
    }
}