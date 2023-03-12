document.addEventListener('DOMContentLoaded', () => 
{

        // Variables generales
    let pantalla = document.querySelector("#pantalla");
    let player = document.querySelector(".pl");
    let punts = 0;
    let grogues;


        // Spawn player en el centro de la pantalla, independientemente de su resolución
    const playerSpPointH = player.clientHeight/2;
    const playerSpPointW = player.clientWidth/2;
    player.style.top = pantalla.clientHeight/2 - playerSpPointH + "px";
    player.style.left = pantalla.clientWidth/2 - playerSpPointW + "px";


        // Llamamos a una función para generar 20 bolas
    boles = generateBalls(20);
        // Función que genera una cantidad pedida de elementos "<div>", en este caso, genera las 20 bolas con diferentes colores, tamaños y ubicación
    function generateBalls(amountBalls)
    {
            // Variables de la función
        let boles = [];
        let color;
        let top;
        let left;
        let size;

            // Bucle para generar el número de bolas
        for(let i=0; i<amountBalls; i++) 
        {

                // Creamos un elemento "<div>" y lo introducimos dentro del body
            boles[i] = document.createElement("div");
            document.body.appendChild(boles[i]);

                // Le damos borde y modificamos su forma para que sea una redonda
            boles[i].style.border = "solid black 2px";
            boles[i].style.borderRadius = "100%";

                // Usando un valor aleatorio, escogemos el color de la bola
            color = Math.random() * (4 - 1) + 1;
            if      (Math.round(color) == 1) boles[i].style.backgroundColor = "yellow";
            else if (Math.round(color) == 2) boles[i].style.backgroundColor = "green";
            else if (Math.round(color) == 3) boles[i].style.backgroundColor = "red";
            else if (Math.round(color) == 4) boles[i].style.backgroundColor = "blue";

                // Le damos un tamaño aleatorio
            size = Math.random() * (69 - 30) + 25;
            boles[i].style.width  = size + "px";
            boles[i].style.height = size + "px";

                // Hacemos que aparezca en una ubicación aleatoria dentro de la pantalla
            boles[i].style.position = "absolute";
            left = Math.random() * ((pantalla.clientWidth  - boles[i].clientWidth ) - 0) + 0;
            top  = Math.random() * ((pantalla.clientHeight - boles[i].clientHeight) - 0) + 0;
            boles[i].style.top  = top  + "px";
            boles[i].style.left = left + "px";
        }

            // Devolvemos el array de bolas
        return boles;
    }


        // Llamamos a una función para tener un contador de bolas amarillas
    grogues = bolesGrogues(20);
        // Función para hacer un contador con el total de bolas amarillas que han spawneado
    function bolesGrogues(totalBolas)
    {
            // Variables de la función
        let contador=0;
            // Bucle para revisar la cantidad de bolas amarillas que hay en el juego
        for(let i=0; i<totalBolas; i++)
        {
                // Si el color de fondo de la bola es amarillo sumamos +1 al contador
            if (boles[i].style.backgroundColor == "yellow") contador++;
        }

            // Devolvemos el contador de bolas amarillas
        return contador;
    }


        // Función para detectar las colisiones
    function detectarXoc(boles)
    {
            // Bucle para revisar si la caja de colisión del jugador está superponiéndose a la de alguna de las bolas
        for(let i=0; i<20; i++)
        {
                // Verificamos que el jugador y una bola estén colisionando
            if
            (
            (player.offsetTop  < boles[i].offsetTop  + boles[i].clientHeight) && 
            (player.offsetTop  + player.clientHeight > boles[i].offsetTop   ) &&
            (player.offsetLeft + player.clientWidth  > boles[i].offsetLeft  ) &&
            (player.offsetLeft < boles[i].offsetLeft + boles[i].clientWidth )
            )
        {
                // Verificamos si la bola es amarilla
                // Si es amarilla sumamos 1 punto y restamos 1 en el contador de bolas amarillas
            if(boles[i].style.backgroundColor == "yellow") 
            {
                grogues--;
                punts++;
            }
                // Si NO es amarilla, restamos un punto
            else punts --;

            console.log(punts);

                // Eliminamos la bola con la que hemos colisionado
            boles[i].remove();
        } 
        }
    }


        // Controlem que al moure la caixa no marxi de pantalla en X
    function getLeftBoxPosition(x)
    {
        if ( x + player.clientWidth/2 >= pantalla.clientWidth)
        {
            x = pantalla.clientWidth - player.clientWidth;
        }
        else if ( x - player.clientWidth/2 <= 0)
        {
            x = 0;
        }
        else
        {
            x = x - player.clientWidth/2;
        }

        return x; 
    }

        // Controlem que al moure la caixa no marxi de pantalla en Y
    function getTopBoxPosition(y)
    {
        if ( y + player.clientHeight/2 >= pantalla.clientHeight)
        {
            y = pantalla.clientHeight - player.clientHeight;
        }
        else if ( y - player.clientHeight/2 <= 0)
        {
            y = 0;
        }
        else
        {
            y = y - player.clientHeight/2;
        }

        return y;
    }


        // Función para cuando no queden bolas amarillas, salga la pantalla de puntuación
    function fiPartida()
    {
            // Limpia la pantalla
        document.body.innerHTML = '';

            // Creamos 2 elementos, 1 "H1" y 1 "H2"
        const resultat = document.createElement("h1");
        const puntuacio = document.createElement("h2");
    
            // Introducimos el texto correspondiente en el H1 ("Victory!" o "Game Over!")
        if(punts >= 1)
        {
            resultat.textContent = "Victory!";
        }
        else 
        {
            resultat.textContent = "Game Over!";
        }

            // Introducimos la puntuación del jugador en el H2
        puntuacio.textContent = "Puntuació: "+ punts;
            
            // Colocamos los textos en la ubicación que les corresponde
        resultat.style.textAlign = "Center";
        puntuacio.style.textAlign = "Center";

            // Añadimos los 2 elementos en el body
        document.body.appendChild(resultat);
        document.body.appendChild(puntuacio);
    
            // Cuando pasen 5 segundos, el juego se reinicia automaticamente 
        setTimeout(function(){location.reload();},5000);
    }


        // Control por ratón
    document.addEventListener('mousemove', function(ev)
    {   
        player.style.left = getLeftBoxPosition(ev.clientX) + "px";
        player.style.top  = getTopBoxPosition(ev.clientY)  + "px";

            // Llamamos a la función "detectarXoc" para que continuamente detecte las colisiones
        detectarXoc(boles);

            // Si el contador de bolas amarillas llega a 0, se termina la partida y se ejecuta la función "fiPartida"
        if(grogues == 0)
        {
            fiPartida();
        }
    }
    ,false);
},false);






//             ___   ____  coded _  by  __           
//            |__ \ ( __ )_   __(_)____/ /_____  _____
//            __/ // __  | | / / / ___/ __/ __ \/ ___/
//           / __// /_/ /| |/ / / /__/ /_/ /_/ / /    
//          /____/\____/ |___/_/\___/\__/\____/_/     



//
//
//                                                                                
//               /.       ,&.                                  .,                 
//                     (%      &                       .&        ,@               
//                         @     .*                 (.     #*                     
//                           (     &              &      (                        
//                            .     @            &     (                          
//                            &      /          %                                 
//                            .      .         ,      %                           
//      .#  %/                 (   # @@,. #*# @/      .                %#  &      
//              *%             #               , @#*@%             @        %     
//      %           ,%&.   .,                        ,#@     ,&@            &     
//       *             &  %&                            ,@*  #             &      
//        &             *                                  /              &       
//         .*            #                                 .            %         
//             %(                                                   %/            
//                   ##   .@ .#                       #  @    &/                  
//                        @*  &@                     @& .*/                       
//                         /                            (                         
//                          /                           #                         
//                          @                           .                         
//                          &                          *                          
//                          .         @      @         &                          
//                           /         .@//@.          #                          
//                           @          ,  ,                                      
//                           ,     &      .    (      &                           
//                            (      #&((/,.(@       /                            
//                              @  (               .*                             
//                                ,   &     .@    *                               
//                                #             ,                                 
//                                ,      &#   .#                                  
//                                 #((  * *  &#,                                  
//                                    & % **                                      
//                                     /#                                         
//                                                              