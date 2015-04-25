(function($)
{
    $.fn.morpion=function()
    {
       this.each(function()
       {
//on defini les variables pour la creation du tableau

    var nb=3;

//on défini les variables de jeux

    var player=1;
    var scoreP1 = 0;
    var scoreP2 = 0;

    startGame();

//on lance la partie
function startGame(){
    var htmlDiv="";
    $('.row',this).remove();
    //on cré le tableau de div et on l'affiche'
    for(var i =1;i <= nb;i++){
        htmlDiv += "<div class='row'>";
        for(var j =1;j <= nb;j++){
            htmlDiv += "<div class='nb"+j+"'></div>";
        }
        htmlDiv += "</div>";
    }
    $(this).append(htmlDiv);
    //on défini la taille du tableau
    $(this).css('width', nb*60+'px');
    $(div,this).css('display', 'inline-block');
    $(div,this).css('width', '50px');
    $(div,this).css('height', '50px');
    $(div,this).css('width', nb*60+'px');
    $('.row div',this).css('background-color', 'grey');
    $(div,this).css('margin', '5px');
    //on défini le comportement des cases
    $('div div',this).click(clickCase);

}

//fonction pour changer de joueur
function changePlayer(){
        if(player == 1){
            player = 2
        }else player = 1;
}

//fonction de test des lignes gagnantes
function checkRow(){
   var win1 = true;
   var win2 = true;
   var winner = false;
   var ligne = $('.row',this);
   ligne.each(function(){
       var win1 = true;
       var win2 = true;
       $(this).children().each(function(){
               if($(this).hasClass('player1') || !$(this).hasClass('check')){
                    win2 = false;      
               }
               if($(this).hasClass('player2')  || !$(this).hasClass('check')){
                    win1 = false;
                    }
       });
       if(win1){
           winner=  "win1";
           return false
       }else if(win2){
           winner = "win2";
           return false;
       }

    })
       return winner;   
}


//fonction de test des colonnes gagnantes
function checkColumn(){
   var win1 = true;
   var win2 = true;
   var column =null;
   var nbElt = $(row,this).size();

   for(var i=1;i <= nbElt; i++){
       var winner = false;
       var win1 = true;
       var win2 = true;
       column = $('.nb'+i,this);
       var j = 1;
       column.each(function(){
               if($(this).hasClass('player1') || !$(this).hasClass('check')){
                    win2 = false;      
               }
               if($(this).hasClass('player2')  || !$(this).hasClass('check')){
                    win1 = false;
                    }
      })
       if(win1){
           winner=  "win1";
           return winner
       }else if(win2){
           winner = "win2";
           return winner;
       }
       j++;
   }
   return winner;    
}

//fonction de test des diagonales gagnantes
function checkDiag(){
   var win1diag1 = true;
   var win2diag1 = true;
   var win1diag2 = true;
   var win2diag2 = true;
   var winner = false;
   var nbElt = $('.row',this).size();
   var ligne = $('.row',this);
   ligne.each(function(indexLine){

       $(this).children().each(function(indexColumn){
           if(indexLine==indexColumn){
               if($(this).hasClass('player1') || !$(this).hasClass('check')){
                    win2diag1 = false;      
               }
               if($(this).hasClass('player2')  || !$(this).hasClass('check')){
                    win1diag1 = false;
               }
            }
           if(indexColumn== (nbElt-indexLine-1)){
               if($(this).hasClass('player1') || !$(this).hasClass('check')){
                    win2diag2 = false;      
               }
               if($(this).hasClass('player2')  || !$(this).hasClass('check')){
                    win1diag2 = false;
               }
            }
       });

        })
       if(win1diag1 || win1diag2){
           winner=  "win1";
       }else if(win2diag2 || win2diag1){
           winner = "win2";
       }
       return winner;   
}

//fonction de test de victoire
function isWinner(){
    var winnerColumn = checkColumn();
    var winnerRow = checkRow();
    var WinnerDiag = checkDiag();
    var winner = false;
    if(winnerColumn){
        winner = winnerColumn;
        }else if(winnerRow){
            winner = winnerRow;
            }else if(WinnerDiag){
                winner = WinnerDiag;
                }
     if(winner == "win1")scoreP1++;
     if(winner == "win2")scoreP2++;         
     return winner
}

//fonction déclenché par l'evenement clik sur une case
function clickCase(){
        //on verifie que la case n'a pas été joué 
        if($(this).hasClass('check')){
            alert('case deja joué');
        }else{
            //on ajoute une classe et on colorie la case (selon le player)
            if(player == 1){
                $(this).addClass("check player1");
                $(this).css('background-color', 'red');
            }else{
                $(this).css('background-color', 'green');
                $(this).addClass("check player2");
            }
    winner = isWinner();
    if(winner){(alert('Le gagnant est le joueur '+player+"\n"+"Score : \nP1: "+scoreP1+" - "+scoreP2+" :P2"))
        startGame();
        }else
        changePlayer();
        }
}
 

 });
 return this;
    };
})(jQuery);