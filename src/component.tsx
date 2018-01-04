import * as React from "react";
import { change } from "keautils";

/**Props for a component compatible with the react-modal-manager */
export interface ModalProps<TValue = any, TResult = any, TParams = any> {
    /**Read only parameters to the modal*/
    params: TParams;
    /**Modal value tracked internally by the modal manager*/
    value: TValue;
    /**Indicates a value change */
    onChange: change.OnChangeFunction<TValue>;
    /**Indicates a modal result*/
    onClose: (result: TResult) => void;
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