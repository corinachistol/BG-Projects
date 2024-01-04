import './App.css';
import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList.js';
import Stats from './components/Stats';

import {useState} from 'react';

function App() {
  const [items,setItems] = useState([])
  

  function handleAddItems(item){
    setItems(items=> [...items, item])
  }

  function handleDeleteItem(id) {
    setItems(items=>items.filter(item=>item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items=>
      items.map(item=>
        item.id === id ? {
          ...item,
          packed: !item.packed
        } : item
      )
    )
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all the items?")
    if(confirmed) setItems([])
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems}/> 
      <PackingList 
        items={items} 
        onDeleteItems={handleDeleteItem} 
        onToggleItem={handleToggleItem}
        onClearList={handleClearList} />
      <Stats items={items}/>
    </div>
  );
}

export default App;
