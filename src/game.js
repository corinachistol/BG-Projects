import React from 'react';
import ReactDOM from 'react-dom/client';

// dev & test & perf
import reportWebVitals from './reportWebVitals';
import './game.scss'
import { Snake} from './snake/ui';

const snake = {
  dummy: "something",
  children: [
      { name: "head", dir: "up", coord : { top:100, left:200} },
      { name: "body", dir: "upDown", coord : { top:150, left:200} },
      { name: "tail", dir: "down", coord : { top:200, left:200} },
  ]
}




const root = ReactDOM.createRoot(document.getElementById('root'));

//GROUPING DATA

root.render(
  <React.StrictMode>

    {/* PARENTCONTEXT */}
    
    <Snake data={snake} />
    
  
    {/* PARENTCONTEXT */}

  </React.StrictMode>
);

// dev & test & perf
reportWebVitals();
