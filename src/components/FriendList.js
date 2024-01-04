import { Friend } from "./Friend";

export function FriendList({friends, onSelection, selectedFriend}) {
    return (
        <ul>
            {friends.map(friend=>(
                 <Friend 
                   friend={friend}
                   key={friend.id}
                   selectedFriend={selectedFriend}
                   onSelection={onSelection} />
            ))}
        </ul>
    )
}



