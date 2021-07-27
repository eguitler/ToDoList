import React from "react";

const Form = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <input name="task" placeholder="Nueva Tarea" />
            <button>Agregar</button>
        </form>
    );
};

export default Form;
