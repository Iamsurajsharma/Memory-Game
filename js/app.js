        
        // Calling Init while window loads
       window.addEventListener('load',init);
        /*
        * Create a list that holds all of your cards
        */
       
       const cardList = ['fa-repeat', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle'];

       //  Selecting Items from Html Page
       const deck = document.querySelector('.deck');
       const restart = document.querySelector('.restart');
       const stars = document.querySelector('.stars');
       const moves = document.querySelector('.moves');
       const timing = document.querySelector('.time');




       /*
       * Display the cards on the page
       *   - shuffle the list of cards using the provided "shuffle" method below
       *   - loop through each card and create its HTML
       *   - add each card's HTML to the page
       */
       let interval=0,
           increment=0,
           time =0,
           score =0,
           move=0,
           isPlaying=false,
           FirstCard,
           SecondCard,
           lockBoard= false
           starCount=3;


       // make card 
       function makeCard(cardClass){
           let li = document.createElement('li');
           li.classList.add('card');
           let icon = document.createElement('i');
           icon.classList.add('fa');
           icon.classList.add(`${cardClass}`);
           li.appendChild(icon);
           deck.appendChild(li);
       }

       //populated these card in DOM and shuffle them
       function populateCardDeck (cardLists){
           shuffle(cardLists.concat(cardLists)).forEach(makeCard);
       }
       function init(){
           populateCardDeck(cardList);

           cardClickHandler();

           initStars();

       }
       // Handles the Click of the Cards
       function cardClickHandler(){
           
       const cards = document.querySelectorAll('.card');
       cards.forEach(card=>card.addEventListener('click',cardClick))
       }
       function cardClick(e){   
           

           if(lockBoard) return;
           if(this===FirstCard) return;     

           this.classList.add('open');
           this.classList.add('show');
           
           if(!isPlaying){
               isPlaying=true;
               FirstCard=this; 
              
               return;      
           }
           
           if(time===0){
            console.log('hell')
            timer();
        }
               isPlaying=false;
               SecondCard=this; 
               checkForMatch();
            
            };
       

       //Matches the Cards 
       function checkForMatch(){
           let isMatched = getClassFromCard(FirstCard)===getClassFromCard(SecondCard);
           
           isMatched ? disableCards():unflipCards();
           
       }
        //Disable the Matched Cards
       function disableCards (){
           
           FirstCard.classList.add('match')
           SecondCard.classList.add('match')
           score++;
         
           resetBoard();
           if(score===8){
            endGame();
        }  
       }
       // UnFlips the UnMatched Cards
       function unflipCards(){
           lockBoard= true;

           FirstCard.classList.add('shake');
           SecondCard.classList.add('shake');

           setTimeout(() => {

               FirstCard.classList.remove('open');
               FirstCard.classList.remove('show');
               SecondCard.classList.remove('open');
               SecondCard.classList.remove('show');
           
               FirstCard.classList.remove('shake');                
               SecondCard.classList.remove('shake');
               resetBoard();
           },1000);
       }
       // grabs child Name of cards
       function getClassFromCard(card) {
           return card.firstChild.className;
       }
       // Resets the board after matched
       function resetBoard(){
           [isPlaying, lockBoard]=[false,false];
           [FirstCard,SecondCard]=[null,null]
           incMoves();
       }
        // Increments the Move
       function incMoves(){
           if (move === 15) {
               reduceStar();
           }
       
           if (move === 30) {
               reduceStar();
           }
           
           move+=1;
           moves.innerHTML=move;
       }
       // Timer which tells the seconds
       function timer(){
           interval= setInterval(() => {
               time+=1;
           timing.innerHTML=time;
           }, 1000);
       }
      // Clear the Interval of the timer
       function clearTimeOut(){
           clearInterval(interval)
           
           timing.innerHTML=0;
       }

       restart.addEventListener('click',restartButtonFunction);
       // Restart the button Function
       function restartFunction(){
           
           
               time=0;
               move=0;
               starCount=0;
   
               
               [isPlaying, lockBoard]=[false,false];
               deck.innerHTML='';
               stars.innerHTML='';
               
               init();
               clearInterval(interval)
           
               moves.innerHTML=0;
               
               clearTimeOut();
               
       }
       //restartButton Function
       function restartButtonFunction(e){
        if(e.target===restartModal){
                   
            toggleModal();
  
          }
          restartFunction();
       }

       //Initializing the Stars

       function initStars(){

           for(let i = 0; i < 3; i++){
               let li = document.createElement('li');
               let i = document.createElement('i');
               i.classList.add('fa');
               i.classList.add('fa-star');
               li.appendChild(i);
               stars.appendChild(li);
           
       }
       }
       
       //function for reducing stars according to the moves
       function reduceStar(){
           
       let star = document.querySelectorAll('.fa-star');
          
          star[star.length -1].classList.remove('fa-star');
          star[star.length -1].classList.add('fa-star-o');
             
         starCount--;
       }
       // Ending the game 
       function endGame(){     
       toggleModal() ;
        
       }


       // Shuffle function from http://stackoverflow.com/a/2450976
       function shuffle(array) {
           var currentIndex = array.length, temporaryValue, randomIndex;

           while (currentIndex !== 0) {
               randomIndex = Math.floor(Math.random() * currentIndex);
               currentIndex -= 1;
               temporaryValue = array[currentIndex];
               array[currentIndex] = array[randomIndex];
               array[randomIndex] = temporaryValue;
           }

           return array;
       }


       /*
       * set up the event listener for a card. If a card is clicked:
       *  - display the card's symbol (put this functionality in another function that you call from this one)
       *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
       *  - if the list already has another card, check to see if the two cards match
       *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
       *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
       *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
       *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
       */


       //flipping cards



       // Apearing the modal and Gives the Winnig msg
       var modal = document.querySelector(".modal");

       var closeButton = document.querySelector(".close-button");
       var stats = document.querySelector('.stats');
   
       function toggleModal() {
      //  clearTimeOut();
           modal.classList.toggle("show-modal");
           stats.textContent=`With ${move} and${starCount} Stars. In ${time} Seconds `
           
           
       restartFunction();  
       }
   
       function windowOnClick(event) {
           if (event.target === modal) {
               toggleModal();

           }
       }
       restartModal = document.getElementById('modal-restart');
       restartModal.addEventListener('click',restartButtonFunction);

       closeButton.addEventListener("click", toggleModal);
       window.addEventListener("click", windowOnClick);