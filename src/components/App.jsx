import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea.jsx";
import { useState } from "react";


function App() {
  const [noteList, setNoteList] = useState([])
  console.log(noteList)

  function addNote(inputText) {
    // console.log(inputText)
    setNoteList(prevNotes=> {
      return [...prevNotes, inputText]
    } )

  }

  function deleteNote(id) {
    setNoteList(prevNotes => {
      return prevNotes.filter( (note,index)=> {
        return index !== id
      } )
    })
  }


  return (
    <div className="App">

      <Header />
      <CreateArea onAdd={addNote} />
      { noteList.map((note,index) =>{
        return <Note 
          key={index} 
          id={index} 
          title={note.title} 
          content={note.content} 
          onDelete={deleteNote} />
      }) }
      
      <Footer />

    </div>
  );
}

export default App;
