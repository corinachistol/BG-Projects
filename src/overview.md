
## VARIANTA FARA VARIABILA SASS
    Obiectul style se ataseaza prop style si devine stil intern, care se trasnmite DOM virtual si eventual DOM real

   const style = {
        width:`${size}px`,
        height: `${size}px`,
        backgroundImage: `radial-gradient(${color}, transparent 60%)` 
    }



Flake
   \            props
    \             |
     \            v
+-----+-------({ size,color })----------+
|                  |                    |
|                  v                    |
|        style ={... }                  |
|                  |                    |
|                  v                    |
|     <div style={...}>                 |
|       </div>                          |
|                                       |
+---------------------------------------+






## VARIANTA CU VARIABILA SASS
    
    Legatura dintre obiects js 'style'  care determina aspectul fulgului si pina la stilurile atasate DOM real, trece printr-un punct intermediar.

     In style.scss utilizam variabile pentru width, height si bgImage.
       > width:var(--size);
       > height: var(--size);
       > background-image: radial-gradient(var(--color), transparent 60%) ;
    
    Variabilele sunt convertite in culori si transmise obiectul style care se ataseaza stilului intern in DOM real.
    Acum toate modificarile facute la variabile nu va influenta deloc comportamentul componentei Flake

 const style = {
       '--size': `${size}px`,
       '--color': color,
    }



Flake
   \            props
    \             |
     \            v
+-----({ size,color,top,left })---------+
|                  |                    |
|                  v                    |
|        style ={... }                  |       loose coupling: object -> styles
|                  |                    |
|                  +--------------------------------------+
|                                                         |            
|                                                         v
|                                                       css vars
|                                                         |
|                  +--------------------------------------+
|                  |                    |
|                  v                    |
|     <div style={...}>                 |
|       </div>                          |
|                                       |
+---------------------------------------+



                     props
Flake                  |
    \                  v
+--------({..., ..., top, ...})-----------+
|                      |                  |
|                      |                  |
|                      +------------------------------------+
|                                                           |
|                                                           |              +-------+
|                      [_top,setTop] <-------------> useState(top) <------>|    0  |
|                      |                  |                                +-------+
|                      |                  | 
|                      |                  | 
|                      +------------------------------------+
|                                         |                 |
|                                         |                 v
|                                         |              css vars
|                                         |                 |
|                      +------------------------------------+
|                      |                  |
|                      v                  |
|           <div style={style}>           |
|           </div>                        |
|                      |                  |
+----------------------v------------------+                      




    <App />-------+
      |           |        +----------- setShowChild(false)     
      |      callback      |                |
      |           |        |                |
      |           |        v                |
      |+-------<Flake ...   />              |
                  x props                   |
                  |                         |
                  |                         |
                  |                         |
                  |                         |
                  |                         |   <flake render lifecycle >
                  |                         |
                  |                         |
                  |                         |
                  v < return ( </>)         |
                    < useEffect (()=>{      |
                        if () =>whenDone()  |
                        else => setTimeout(  )
                    })


## "remove" the flake  / it's all about CONTROL

virtual DOM                            DOM

<App/> (component) ------------------> <div class="App"/>
  |                                         |
  |                                         |
  +---<Flake..../> (component) ----------> +----<div class="flake"/>
        ^
        |
        false


1. ascunzi componenta flake prin display:"none". Neajuns -> in virtual DOM, functia componentei va rula de fiecare data cind tre de facut un update.La o componenta, nu e problema, dar la mai multi fulgi virtual DOM va lucra si cu acestia, mai multa memorie consumata. Controlul este detinut de componenta copil FLake,este transferat prin css in browser, pina la urma React nu controleaza nimic in asa caz. 
## Exemple in care termporat ascunzi o compoennta: dropdown, carousel,slide, modal. Atit timp cit stim ca vom reveni la aceeasi manifestare a componentei.

2.  o alta conditie poate fi scrisa chiar in interiorul return FLake( TOP_LIMIT > 100 ? <div style={style} className="flake"></div> : null ). sau de a returna <></>, dar el tot ocupa memorie. Controlul se afla inca in miinile copilului, diferenta daca returnanm null, div-ul nu va fi prezenta in DOM real.Scade nivelul de procesare in memorie.

3. ultima abordare , lift up the state, conditional rendering in App. Printr-un && am marcat conditia ca atunci cind e false, Flake sa fie sters din DOM. Acest aproach este cel mai bun cind  vrei sa elimini un element de pe ecran. Noua ne trebuie nu doar sa dispara vizual, dar si resursele din memorie sa fie 0 pentru aceasta componenta. Controlul acum e detinut de parinte. 
##  Exemple: rezultatele cautarii, search, modal in care de fiecare data afiseaza un nou continut, notificarile apar cu alte mesaje,


    <App>
      |
---------------------------------------------
      |
      +--------<Snow quantity={5}/>
                  |         |  
                  |         +---useState()
                  |         +---useEffect() + timer
                  |
                  +-----<Flake...>   acum este o componenta pura,
                  |
                  +-----<Flake ...>
                  |
                  ...


## lifecycle Snow (HoC)
        
        .
        setTop(top: 80+5) --> 85
        |
        v
x     call Snow()
|
|
x--   flakes = [<Flake size={10} top={85} color={color}/>]
|
|
|
|
|
|
|
|
|
|
x-- render flakes
|
|
v   return Snow()
.
.
* ---> call useEffect(()=>{  })
                            | setTimeot( )
                            |
                            .delay 500ms
                            v
                            () => { }
                                |
                                v
                              top > TOP_LIMIT ? -- true--> flakes=[]
                                |
                             false
                                v
                            setTop(top: ? +5) -> ? 



---- [  ] <-----update
      |
      0--Flake <---- (obj)
      1--Flake <----
      ....
      n---Flake
    

                              