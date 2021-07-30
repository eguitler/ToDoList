import Button from "components/Button";
import React, { useState } from "react";
import { FormStyled } from "./styles";

const Form = ({ onSubmit, inputPlaceHolder, textButton }) => {
    const [input, setInput] = useState("");

    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input) {
            onSubmit(input);
            setInput("");
        }
    }

    return (
        <FormStyled onSubmit={handleSubmit} data-testid="form">
            <input
                placeholder={inputPlaceHolder}
                onChange={handleChange}
                value={input}
            />
            <div className="button-wrapper">
                <Button text={textButton} primary={true} disabled={!input} />
            </div>
        </FormStyled>
    );
};

export default Form;
