# react-modal-manager
Show react modals using async/await

### Create a modal manager and render the component
```js
    class MyComponent extends React.Component {
    modalManager = createModalManager();

        render() {
            return (
                <div>
                    {/*...*/}
                    {modalManager.component}
                </div>
            )
        }
    }

```

###  Use async/await to show modals

```js
    handleShowModal = async () => {
        //Show the modal and await for the user to close it
        const modal = await this.modalManager.showModal(MyModalComponent, { myParams: "a" },  { myValue: "b" } );
        if(modal.result === true) {
            alert("user value: " + modal.value);
        } else {
            alert("the user has cancelled the modal");
        }
    }
```

### `MyModalComponent` is any react component with a `ModalProps` props