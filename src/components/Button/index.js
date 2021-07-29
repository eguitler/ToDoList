import React from "react";
import { ButtonStyled } from "./styles";

const Button = ({
    text,
    primary = false,
    onClick = null,
    disabled = false,
}) => {
    const classes = `${primary ? "primary" : "default"} ${
        disabled ? "disabled" : ""
    }`;
    return (
        <ButtonStyled className={classes} onClick={onClick} disabled={disabled}>
            {text}
        </ButtonStyled>
    );
};

export default Button;
