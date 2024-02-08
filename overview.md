## Snake Game
    > JS: loops, conditional ,functional, OOP , timers
    > DOM: structure,manipualtion, events
    > Algorithms
    > data structure: Tree, Hierarchy, Array, Object, JSON
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
                    <SnakeHead headData={headData} /> ---> obtinem un strat in plus care trebuie desctructurizat {headData:{dir,top,left}}

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



## PART6


## setTimeout
>In unele situatii cind macheta este independenta, gen un countdown care nu influenteaza nimic din macheta, atunci toata rezolutia poate fi facuta in interior, timer,stateManagement, data,etc.

    initData
        |
        v
<Snake props />
    |
setTimeout() > setState()
    |               |
    |         data<---
    |           |
    |           v
    +---------<Component/>
                    |
                    +--------<SnakeHead />
                    |
                    +--------<SnakeTail />



>Daca componenta trebuie sa interactioneze, setam timer-ul care va influenta datele la un nivel mai sus  si pe urma la transmitem prin prosp in jos.
Cu cit mai sus ridici state management, cu atit structura de date va fi mai complexa si mai greu de menajat, cere mai multa atentie, mai multa responsabilitate si e mai strong coupled.

            initData
                 |
                 v
        <Game props />
                 |
            setTimeout() 
            useState()
                 |
                 v
            chidlren
                |
                +----  <Snake       props /> 
                |           |          |  
                |           |          |
                |           |          v
                |           +------<Component/>
                |                           |
                |                           +--------<SnakeHead />
                |                           |
                |                           +--------<SnakeTail />
                +-----<Apple props/>


Add Apple component ---> render it
                        try to refactor in order to reuse the code
                        separate the common logic





## PART9

STATE UPDATES


            state                                                   newState
                |                                                       |
                |                                                       |
                |                                                       |                                                            |
                +-----------------------------------                    |
                                                   |                    |
            +-----------------------------------------------+           |
dispatch({...})                                    |        |           |
           |                                       |        |           |
           |                                       v        v           |
           +---------? ... ------> reduceGameState(state, action) {     |
                ...                                                     |
                reducing logic                                          |
                ...                                                     |
                return newState ----------------------------------------+
           }
                     

STATE
X --------> ... ------> reducer() ------> .... --------> newState
                                            |
                                            ^
                        segmentul de la starea curenta de apel pinala reducer si pina la newState nu ne apartine noua, Reactul sub capota. Avantajul decoupling






Reducer is a function that has access to previous state and can change the current or final state.

useReducer = se potriveste mai bine cu structuri de date complexe.
useState cu valori primitive


COORD ENGINE    

x -------------------> backwards
 3       2    1     0
 0       1    2     3 dupa reverse
 +-----+ +----+ +---+ 
 v     | v    | v   |
[T]    [B]    [B]   [H]  >

Tail va copia starea si coord din body, 
Body din Body
Body din Head
Head va dicta directia si coord






B (/) > right

   ^ 
   |
   up


  down
   |
   v

B (\) > right



        [H][B]
           [B]
           [B]
           [T]

    [H][B][B]
          [B]
          [T]




U-L +
U-R  +
D-L  +
D-R  +

R-D -
R-U -
L-U -
L-D -


   [H]
        <---
   [B]
[T][B]







 



   
   
   




