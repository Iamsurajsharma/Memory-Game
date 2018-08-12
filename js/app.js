        /*
        * Create a list that holds all of your cards
        */
        window.addEventListener('load',init);

        const cardList = ['fa-repeat', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle'];

        const deck = document.querySelector('.deck');
        const restart = document.querySelector('.restart');
        const stars = document.querySelector('.stars');
        const moves = document.querySelector('.moves');




        /*
        * Display the cards on the page
        *   - shuffle the list of cards using the provided "shuffle" method below
        *   - loop through each card and create its HTML
        *   - add each card's HTML to the page
        */
        let interval=0;
        let increment=0;
        let time =0;
        let score =0;
        let move=0;
        let isPlaying=false;
        let FirstCard;
        let SecondCard;
        let lockBoard= false;
        let starCount=3;


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
                timer();
                return;      
            }
                isPlaying=false;
                SecondCard=this; 
                checkForMatch();


             };
        

        
        function checkForMatch(){
            let isMatched = getClassFromCard(FirstCard)===getClassFromCard(SecondCard);
            
            isMatched ? disableCards():unflipCards();
            
        }
        function disableCards (){
            
            FirstCard.classList.add('match')
            SecondCard.classList.add('match')
            score++;
            
            resetBoard();
            
        }
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

        function getClassFromCard(card) {
            return card.firstChild.className;
        }
        function resetBoard(){
            [isPlaying, lockBoard]=[false,false];
            [FirstCard,SecondCard]=[null,null]
            incMoves();
        }

        function incMoves(){
            move+=1;
            moves.innerHTML=move;
            if (move > 15) {
                reduceStar();
            }
        
            if (move > 50) {
                reduceStar();
            }
        }
        function timer(){
            interval= setInterval(() => {
                time+=1;
                
            if(score===8){
                endGame();
            }
                console.log(time);
            }, 1200);
        }
        function clearTimeOut(){
            clearInterval(interval)
        }

        restart.addEventListener('click',restartFunction);
        function restartFunction(e){
            
            
                time=0;
                move=0;
    
                
                [isPlaying, lockBoard]=[false,false];
                deck.innerHTML='';
                stars.innerHTML='';
                init();
                
                moves.innerHTML=0;
                clearTimeOut();
                if(e.target===restartModal){
                    
                toggleModal();
        
                }
        }
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

        function endGame(){
            
        toggleModal() 
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




        var modal = document.querySelector(".modal");
        var trigger = document.querySelector(".trigger");
        var closeButton = document.querySelector(".close-button");
        var stats = document.querySelector('.stats');
    
        function toggleModal() {
            modal.classList.toggle("show-modal");
            stats.textContent=`With ${move} and ${starCount} Stars`
            clearTimeOut();
        }
    
        function windowOnClick(event) {
            if (event.target === modal) {
                toggleModal();

            }
        }
        restartModal = document.getElementById('modal-restart');
        restartModal.addEventListener('click',restartFunction);

        closeButton.addEventListener("click", toggleModal);
        window.addEventListener("click", windowOnClick);