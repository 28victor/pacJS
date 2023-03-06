document.addEventListener('DOMContentLoaded', () => {
    let pantalla = document.querySelector("#pantalla");
    let player = document.querySelector(".pl");
    let target = document.querySelector(".target");



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
        //Bucle per generar el número de boles (amountBalls)
        for(let i=0; i<amountBalls; i++) {
            boles[i] = document.createElement('div'); 
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
        
    //Control de col·lisió
    function detectarXoc()
    {
        if(
            (player.offsetTop < target.offsetTop+target.clientHeight) && 
            (player.offsetTop+player.clientHeight > target.offsetTop) &&
            (player.offsetLeft+player.clientWidth > target.offsetLeft) &&
            (player.offsetLeft < target.offsetLeft+target.clientWidth)
        )
        {
            console.log("Xoc!");
            target.remove();
            alert("Victory!")
        }     
    }
    
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
        detectarXoc();
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
    

