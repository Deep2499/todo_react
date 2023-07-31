import React from "react";
import TodoContext from "./TodoContext";

const TodoState = (props) => {
    const state = {
        "name":"deep"
    }
    return (
        <TodoContext.Provider value={state}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState ;
 