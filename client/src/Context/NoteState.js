import { createContext, useState } from "react";

export const NoteContext = createContext();

const NoteState = (props) =>{

    const storedNotes = [
        {
          "_id": "64dcf2ccf2f38788b3702534",
          "user": "64dc7d645bbb746ca648619b",
          "title": "note5",
          "description": "This is the 5th note of gabdu",
          "tags": "personal",
          "date": "2023-08-16T16:01:16.898Z",
          "__v": 0
        },
        {
          "_id": "64dcf304f2f38788b370253a",
          "user": "64dc7d645bbb746ca648619b",
          "title": "note7",
          "description": "This is the 7th note of gabdu",
          "tags": "personal",
          "date": "2023-08-16T16:02:12.239Z",
          "__v": 0
        }
      ]
       const [notes,setNotes] = useState(storedNotes)
    return(
        <NoteContext.Provider value={notes}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;