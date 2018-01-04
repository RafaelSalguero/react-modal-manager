import { createModalManager } from "../src/index";
import { MyModal } from "./modal";
import * as React from "react";
import * as DOM from "react-dom";

export class App extends React.PureComponent {
    private modalManager = createModalManager();

    private onShowModal = async () => {
        const modal = await this.modalManager.showModal(MyModal, { title: "My modal title" }, { text: "rafa",otroValue: "hola" });
        if(modal.result) {
            alert("value: "  + modal.value.text);
        } else {
            alert("cancelled");
        }
    }

    render() {
        return (
            <div>
                <h2>My app</h2>
                <button onClick={this.onShowModal}> 
                    Show modal
                </button>

                {this.modalManager.component}
            </div>
        )
    }
}

DOM.render(<App />, document.getElementById("root"));
