import React from 'react';
import ReactDOM from 'react-dom/client';

// dev & test & perf
import reportWebVitals from './reportWebVitals';
import './app.scss'

import { Game} from './game/ui';



const game = {

  score:0,
  state: "started",

  children: [  // <-- .find() , /findIndex()
    {
      name: "snake",
      children: [      // <-----.map()
          { name: "head", dir: "left", coord : { top:120, left:180} },
          // HW1: add new segment here
          { name: "body", dir: "up-left", coord : { top:120, left:200} },
          { name: "body", dir: "up", coord : { top:140, left:200} },
          { name: "body", dir: "up", coord : { top:160, left:200} },
          { name: "tail", dir: "up", coord : { top:180, left:200} },
      ]
    },

    {
      name: "apple",
      // quantity: Math.floor(Math.random() * 10),
      coord: {top:240, left:240}
    },
  ]
  
}




const root = ReactDOM.createRoot(document.getElementById('root'));

//GROUPING DATA

root.render(
  <React.StrictMode>

    <Game data={game}/>
    
  </React.StrictMode>
);






// dev & test & perf
reportWebVitals();
