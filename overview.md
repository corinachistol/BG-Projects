## Snake Game
    > JS: loops, conditional ,functional, OOP , timers
    > DOM: structure,manipualtion, events
    > Algorithms
    > dat astructure: Tree, Hierarchy, Array, Object, JSON
    > storage /AJAX/ fetch
    > node,webpack
    > jsx
    > react: functional, hooks, state management, routing, forms...
    > Material UI
 

    css: sass
    > TS


## Stage1 / front / react
    >init
    >strip down (SPA = browserul incarca un singur doc HTML prin request si restul se incarca prin fetch ori AJAX. Documentul ramine acelasi dar ,aplicatia ii schimba structura, elementele , rerandeaza parti din acest document fara  ca sa reincarci pagina de pe server)

    > hierarchi (UI,Model)
    > inside-out

        UI
    +----------------+
    |                 |
    |                 |
    |                 | <----------
    |                 |             DATA LAYER (Model)
    |                 | ---------->
    |                 |
    +----------------+

    UI
    |
    +----Map (HoC)
          |
          |
          + ---Snake
          |      |
          |      + ------children [
          |                 0 -----  SnakeHead
          |                 1 -----  SnakeBody 
          |                 2 -----  Snakebody
          |                 ....
          |                 n-1 ----  SnakeBody
          |                n -----  SnakeTail
          |             ]
          + ----Mouse 



          component.js <------------ import 'style.scss'
                                        ^
                                        |           ...
                                        |            url(.../image.jpg)
                                    process



src(editor) -------> compilation -----> loads/mounts -----> vDOM ---> render -----DOM ---->window
    ^                                                         |
    |                                                         |
    |                                                       state management aici se incarca
    change                                                  



+-----------------functionale SnakeHead () -------------+   +-----------------------+
|                                                       |   |                       |
|                                                       |   |                       |
|            ....                                       |   |                       |
|             const[dir.setDir]  = useState('up)---------------> ['up]  <--         |
|            ....    ^      ^                           |   |        |    |         |
|                    |      | +-------------------------------- (val)|=>{ val   }   |
|                    |-----------------------------------------------+    |         |
|                                                       |   |              +---update ----->vDOM
|                                                       |   |                       |
+-------------------------------------------------------+   +-----------------------+



                            (pass from parent context)
                            |   (default) 
                            v    v
+--------------Snakehead({dir="up"})------------+       +-----------------------------------+           
|                                               |       |                                   |   
|                                               |       |                                   |
|      ...                                      |       |                                   |    
|        const [_dir,setDir] = <----useState("up")------------------> _dir                    |
|      ...                                      |       |                                   |
|      ...                                      |       |                                   |   |      ...{_dir}
|                                               |       |                                   |    
|                                               |        +---------------------------------+   
+-----------------------------------------------+   
         

OUTSIDE/ PARENT CONTEXT

                    headData={dir:"up,top:100, left:100}

                    <SnakeHead {...headData} />  ne permite sa scapam de un strat headData si   doar destructurizam props in structura {dir,top.left}
                    <SnakeHead headData={headData} /> ---> obtinem un start in plus care trebuie desctructurizat {headData:{dir,top,left}}

                        |
                        |
                        props
                          |
                          +----headData
                                    |
                                    +- dir
                                    +- top
                                    +- left

    Avem 2 parti componente
        UI                  DATA
    componente(snakehead)  (obiectul headDAta)
+--------------+      +----------------+
|              | <--->|                |
+--------------+      +----------------+



# DRY (Don't Repeat Yourself)
    - OOP: inheritance,composition
    - functional: composition


            Components
                |
                +-----backround
                |
                +-----coords
                |
                |
                v (wrapper,decorator)
                + <--------withDirection (OPTIONAL)
                |
            ------------
             /      \
            /        \
        SnakeHead   SnakeTail




                                (name)
                   < Component ..../>
                        |
                        |
                        v
        withDirection(Component)
                        |
        withcoordinates(Component)
                        |
                        |  
                        |   
                        v   
                     <ReadyToUseComponent />






Component 
        \
        +---class
        +----background





SnakeHead

    + coordiante (common)

    + background (common)

    + direction  (specific)




daca o functie returneaza () JSX -> React intelege ca este o componenta functionala
daca o functie returneaza altceva decit JSX -> React intelege ca este o functie ordinara

-------------------DATA--------------------


const snake = {
  dummy: "something",
  children: [
      { name: "head", dir: "up", coord : { top:100, left:200} }
      { name: "tail", dir: "down", coord : { top:150, left:200} }
  ]
}
            |
            |
            |
            v
----------------------UI--------------

<Snake props />
    |
    +---------<Component/>
                    |
                    +--------<SnakeHead />
                    |
                    +--------<SnakeTail />