import * as React from "react";
import { ModalProps } from "../src/index";
export interface Params {
    title: string;
}

export interface Value {
    text: string;
}

export class MyModal extends React.PureComponent<ModalProps<Value, boolean, Params>>  {
    private handleOnChange = (x: React.ChangeEvent<HTMLInputElement>) => {
        const old = this.props.value;
        const next = { ...old, text: x.target.value };
        this.props.onChange(next);
    }

    render() {
        return (
            <div>
                <h2>
                    {this.props.params.title}
                </h2>

                <div>
                    <label>Text:</label>
                    <input value={this.props.value.text} onChange={this.handleOnChange} />
                </div>

                <div>
                    <button onClick={() => this.props.onClose(true)}>
                        Ok
                    </button>

                    <button onClick={() => this.props.onClose(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }
}