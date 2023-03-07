document.addEventListener('DOMContentLoaded', () => {
    let pantalla = document.querySelector("#pantalla");
    let player = document.querySelector(".pl");
    let boles = document.querySelector("div");



    // Spawn player

    const playerSpPointH = player.clientHeight/2;
    const playerSpPointW = player.clientWidth/2;

    player.style.top = pantalla.clientHeight/2 - playerSpPointH + "px";
    player.style.left = pantalla.clientWidth/2 - playerSpPointW + "px";


    // Spawn target (provisional)
    
    generateBalls(20);

    function generateBalls(amountBalls){
        //Creem una llista/array de boles buida
        let boles = [];
        let color;
        let top;
        let left;

        //Bucle per generar el número de boles (amountBalls)
        for(let i=0; i<amountBalls; i++) {
            boles[i] = document.createElement("div");
            document.body.appendChild(boles[i]);

            boles[i].style.width = 30 + "px";
            boles[i].style.height = 30 + "px";

            boles[i].style.border = "solid black 2px";
            boles[i].style.borderRadius = "100%";

            color = Math.random() * (4 - 1) + 1;

            if (Math.round(color) == 1) boles[i].style.backgroundColor = "yellow";
            else if (Math.round(color) == 2) boles[i].style.backgroundColor = "green";
            else if (Math.round(color) == 3) boles[i].style.backgroundColor = "red";
            else if (Math.round(color) == 4) boles[i].style.backgroundColor = "blue";

            left = Math.random() * ((pantalla.clientWidth - boles[i].clientWidth) - 0) + 0;
            top = Math.random() * ((pantalla.clientHeight - boles[i].clientHeight) - 0) + 0;
            boles[i].style.position = "absolute";
            boles[i].style.top = top + "px";
            boles[i].style.left = left + "px";
        }


        //Retornem la llista de boles generades (la farem servir després)
        return boles;
    }


    

        //Controlem que al moure la caixa no marxi de pantalla
        function getLeftBoxPosition(x)
        {
            if( x + player.clientWidth/2 >= pantalla.clientWidth){
                x = pantalla.clientWidth - player.clientWidth;
            }else if( x - player.clientWidth/2 <= 0){
                x = 0;
            }else{
                x = x - player.clientWidth/2;
            }
            return x; 
        }
     
        //Controlem que al moure la caixa no marxi de pantalla
        function getTopBoxPosition(y)
        {
            if( y + player.clientHeight/2 >= pantalla.clientHeight){
                y = pantalla.clientHeight - player.clientHeight;
            }else if( y - player.clientHeight/2 <= 0){
                y = 0;
            }else{
                y = y - player.clientHeight/2;
            }
            return y;
        }
        
    // Control de col·lisió
    // function detectarXoc()
    // {
    //     if(
    //         (player.offsetTop < boles.offsetTop+boles.clientHeight) && 
    //         (player.offsetTop+player.clientHeight > boles.offsetTop) &&
    //         (player.offsetLeft+player.clientWidth > boles.offsetLeft) &&
    //         (player.offsetLeft < boles.offsetLeft+boles.clientWidth)
    //     )
    //     {
    //         console.log("Xoc!");
    //         target.remove();
    //         alert("Victory!")
    //     }     
    // }
    
    function controlarLimits(){
        if(player.offsetLeft < 0) 
            player.style.left = 0;
        if(player.offsetTop < 0)  
            player.style.top  = 0;
        if(player.offsetTop+player.clientHeight > pantalla.clientHeight) 
            player.style.top  = (pantalla.clientHeight - player.clientHeight) + "px";
        if(player.offsetLeft+player.clientWidth > pantalla.clientWidth)
            player.style.left = (pantalla.clientWidth - player.clientWidth) + "px";
    }


    // Control per ratolí
    document.addEventListener('mousemove', function(ev){   
        player.style.left = getLeftBoxPosition(ev.clientX) + "px";

        player.style.top  = getTopBoxPosition(ev.clientY) + "px";
        // detectarXoc();
    },false);

},false);







    // Control per teclat
    // document.addEventListener('keydown',function(ev){
    //     Per simular mateix efecte que amb el ratolí cal ubicar eix coordenades (x,y) al centre de l'objecte
    //     let x = player.offsetLeft + player.clientWidth/2;
    //     let y = player.offsetTop + player.clientHeight/2;

    //     let rotacio = 0;

    //     switch(ev.key)
    //     {
    //         case 'ArrowDown'    :   
    //                                  caixaVermella.style.top = getTopBoxPosition(y+10) + "px";
    //                                  console.log("Avall");
    //                                 break;
    //         case 'ArrowUp'      :   
    //                                  caixaVermella.style.top = getTopBoxPosition(y-10) + "px";
    //                                  console.log("Amunt");
    //                                 break;
    //         case 'ArrowLeft'    :   rotacio-=3
    //                                  caixaVermella.style.transform = caixaVermella.style.transform + 'rotate(-5deg)';
    //                                  caixaVermella.style.left = getLeftBoxPosition(x-10) + "px";
    //                                  console.log("Esquerra");
    //                                 break;

    //         case 'ArrowRight'   :   rotacio+=3;
    //                                  caixaVermella.style.transform = caixaVermella.style.transform + 'rotate(5deg)';
    //                                  caixaVermella.style.left = getLeftBoxPosition(x+10) + "px";
    //                                 console.log("Dreta");
    //                                 break;
    //     }
    //     player.style.transform = 'rotate('+rotacio+'deg';
    //     controlarLimits();
    //     detectarXoc();

    // },false);
    

