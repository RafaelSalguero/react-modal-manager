import { ModalManager, ShowModalFunc } from "./manager";
import * as React from "react";
/**
 * Crea el componente para mostrar los dialogos y la función para mostrar un modal. Para utilizarlo dibuje el componente en cuarlquier parte de su 
 * nodo de React y llame a la función showModal. La función mostrará el cuadro de diálogo al ser llamada y devolverá una promesa que se resolverá cuando
 * el usuario cierre el modal, devolviendo el resultado y el valor del modal
 */
export function createModalManager(): { component: JSX.Element, showModal: ShowModalFunc } {
    //Mantenemos una cola de las llaamdas al show modal en caso de que la función show modal se llame antes de que este disponible la referencia al componente
    let instance: ModalManager | undefined = undefined;
    let queue: ((instance: ModalManager) => void)[] = [];

    const processQueue = () => {
        while (instance && queue.length > 0) {
            const value = queue.pop();
            if (value) {
                value(instance);
            }
        }
    }
    const handleRef = (x: ModalManager) => {
        instance = x;
        processQueue();
    };

    const component = <ModalManager ref={handleRef} />
    const showModal: ShowModalFunc = (component, params, value) => {
        return new Promise(resolve => {
            queue.push(i => i.showModal(component, params, value).then(x => resolve(x)));
            processQueue();
        });
    };

    return { component, showModal };
}