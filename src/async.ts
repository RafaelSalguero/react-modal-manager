
/**Crea una nueva promesa y devuelve por separado la promesa y las funciones que resuelven y rechazan a la promesa */
export function splitPromise<T>(): { promise: Promise<T>, resolve: (value?: T | PromiseLike<T> | undefined) => void, reject: (reason?: any) => void } {
    let resolve = null as any;
    let reject = null as any;
    const promise = new Promise<T>((promResolve, promReject) => {
        resolve = promResolve;
        reject = promReject;
    });

    return { promise, resolve, reject };
}
