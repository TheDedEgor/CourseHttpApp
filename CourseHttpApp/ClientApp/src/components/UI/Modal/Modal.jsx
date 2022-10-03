import React from "react";
import "./Modal.css"

const Modal = ({children}) =>{
    return(
        <div className={"modal_window active"}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;