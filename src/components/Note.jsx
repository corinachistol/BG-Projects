import DeleteIcon from '@mui/icons-material/Delete';

export default function Note({title, content, onDelete, id}) {
    console.log(title,content)
    return (
        <div className="note">
            <h1>{ title }</h1>
            <p>{ content }</p>
            <button onClick={() => {
                onDelete(id)
            }}>
                <DeleteIcon/>
            </button>
        </div>
    )
}



//2. Implement the delete note functionality.
//- Callback from the Note component to trigger a delete function.
//- Use the filter function to filter out the item that needs deletion.
//- Pass a id over to the Note component, pass it back to the App when deleting.

//This is the end result you're aiming for:
//https://pogqj.csb.app/
