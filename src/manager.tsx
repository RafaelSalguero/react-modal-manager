import * as React from "react";
import { splitPromise } from "./async"
import { ModalManagerState, ModalManagerComponent, ModalProps, ModalEntry } from "./component";
import { change } from "keautils";

export interface ModalResult<TValue = any, TResult = any> {
    value: TValue;
    result: TResult;
}
export interface ShowModalFunc {
    <TValue, TResult, TParams>(component: ((props: ModalProps<TValue, TResult, TParams>) => JSX.Element) | React.ComponentClass<ModalProps<TValue, TResult, TParams>>, params: TParams, value: TValue): Promise<ModalResult<TValue, TResult>>
}

/**
 * Clase para manejar los modales de una aplicación. Obtenga una referencia de la clase y llame a la función 
 */
export class ModalManager extends React.PureComponent<{}, ModalManagerState> {
    constructor(props) {
        super(props);

        this.state = {
            modals: [],
            nextId: 0
        };
    }

    /**
     * Muestra un modal. Devuelve un promesa que se resuelve cuando el usuario cierra el modal con el valor del modal y el resultado de cerrado del modal
     * @param value Valor inicial del modal
     * @param component Componente que dibuja al modal
     */
    showModal: ShowModalFunc = (component, params, value) => {
        const oldList = this.state.modals;
        const currentId = this.state.nextId;
        const prom = splitPromise<ModalResult>();

        const entry: ModalEntry = {
            component: component,
            props: {
                value: value,
                params: params,
                onChange: this.handleOnChange(currentId),
                onClose: this.handleOnClose(currentId, prom.resolve)
            },
            id: currentId
        };

        //Agregamos el modal e incrementamos el id:
        this.addEntry(entry);

        //Esta promesa se va a resolver cuando el usuario cierre el modal
        return prom.promise;
    }

    private handleOnClose = (id: number, resolve: (value: ModalResult) => void) => (result: any) => {
        //Llamamos al resolve
        resolve({ value: this.getValue(id), result: result });

        //Quitamos la entrada
        this.removeEntry(id);
    }

    private removeEntry(id: number) {
        this.setState(prev => ({ modals: prev.modals.filter(x => x.id != id) }));
    }

    /**Agrega una entrada de modal e incrementa el id */
    private addEntry(entry: ModalEntry) {
        this.setState(prev => ({ modals: [...prev.modals, entry], nextId: prev.nextId + 1 }));
    }

    /**Obtiene el valor de un modal */
    private getValue = (id: number) => {
        const oldList = this.state.modals;
        return oldList.filter(x => x.id == id)[0].props.value;
    }

    /**Recibe el cambio del valor de un modal */
    private handleOnChange = (id: number) => async (value: change.OnChangeArgument<any>) => {
        const nextFunc = change.toChangeArgumentFunction(value);
        const oldList = this.state.modals;
        const newList = oldList.map(x => x.id == id ? { ...x, props: { ...x.props, value: nextFunc(x.props.value) } } : x);

        await new Promise(resolve => this.setState({ modals: newList }, resolve));
    }

    render() {
        return <ModalManagerComponent {...this.state} />
    }
}
