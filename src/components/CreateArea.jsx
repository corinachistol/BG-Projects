import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Zoom } from '@mui/material';

export default function CreateArea({onAdd}) {

    const [isExpanded, setIsExpanded] = useState(false)

    const [note, setNote] = useState({
        title: "",
        content: ""
    })

    function handleChange(e){
        // const newValue= e.target.value  //value = cuvintele care le scrim
        // const inputName = e.target.name  //name = numele cimpului(title ori content)
        // console.log(newValue,inputName).
        const {value, name} = e.target

        setNote(prevValue=>{
            if(name === "title") {
                return {
                    title:value,
                    content:prevValue.content
                }
            } else if(name === "content") {
                return {
                    title:prevValue.title,
                    content:value
                }
            }
        })
        //shorter version with spreaad operator
        // setNote(prevValue=>{
        //     return {
        //         ...prevValue,
        //         [name]:value
        //     }
        // })
        
    }

    function submitNote(e) {
        onAdd(note)
        setNote({
            title: "",
            content: ""
        })
        
        e.preventDefault()
    }
   

    function expand() {
        setIsExpanded(true)
    }

    return(
        <div >
            <form className="create-note">
                { isExpanded && <input onChange={handleChange} 
                    name="title" 
                    placeholder="Title" 
                    value={note.title} />}
                <textarea onChange={handleChange}  onClick={expand}
                    name="content" 
                    placeholder="Take a note..." 
                    rows={isExpanded ? "3" : "1"} 
                    value={note.content}></textarea>
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon/>
                    </Fab>
                </Zoom>
            </form>
        </div>
    )
}

//CHALLENGE:
//1. Implement the add note functionality.
//- Create a constant that keeps track of the title and content.
//- Pass the new note back to the App.
//- Add new note to an array.
//- Take array and render seperate Note components for each item.


//This is the end result you're aiming for:
//https://pogqj.csb.app/
