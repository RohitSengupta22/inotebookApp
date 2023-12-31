import { createContext, useState } from "react";

export const NoteContext = createContext();

const NoteState = (props) =>{

    const storedNotes =[]
       const [notes,setNotes] = useState("New Note")
    return(
        <NoteContext.Provider value={notes}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;