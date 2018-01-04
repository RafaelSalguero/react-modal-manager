import * as React from "react";
import { ModalProps } from "../src/index";
export interface Params {
    title: string;
}

export interface Value {
    text: string;
    otroValue: string;
}

export class MyModal extends React.PureComponent<ModalProps<Value, boolean, Params>>  {
    private handleOnChange = (x: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(old =>  ({ ... old, text: x.target.value }) );
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

                    <label>OtroValue:</label>
                    <input value={this.props.value.otroValue} />
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