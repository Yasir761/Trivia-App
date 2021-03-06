console.log('this is Js');
// grabbing a game div with id game //

const game = document.getElementById('game');
// grabbing a score span with id score //

const getScore = document.getElementById('score');
let score = 0;
// const genre = 11;


// Creating an array of objects //

const genres = [
    {
        name:'Books',
        id:10
    },{
        name:'Film',
        id:11
    },{
        name:'Music',
        id:12
    },{
        name:'Video Games',
        id:15
    }
]
// creating array of level through which we iterate fetched api//

const Levels = ['easy','medium','hard'];


function addGenre(genres){
    const column = document.createElement('div');
    column.classList.add('genre');
    column.innerHTML = genres.name
    game.append(column);

    Levels.forEach(level=>{
        const card = document.createElement('div')
            card.classList.add('card')
            column.append(card);
            if(level === 'easy'){
                card.innerHTML = 100;
            }else if(level === 'medium'){
                card.innerHTML = 200
            }else if(level === 'hard'){
                card.innerHTML = 300
            }

        fetch(`https://opentdb.com/api.php?amount=1&category=${genres.id}&difficulty=${level}&type=boolean`)
        .then(response=>
            response.json())
            .then(data=>{
                console.log(data);
                card.setAttribute('data-question',data.results[0].question)
                card.setAttribute('data-answer',data.results[0].correct_answer)
                card.setAttribute('data-value',card.getInnerHTML())
            })
            .then(done=>card.addEventListener('click',flipCard))
            
    })


}

genres.forEach(genre=>addGenre(genre))

function flipCard(){
    this.innerHTML = '';
   const textDisplay = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');
    trueButton.innerHTML = 'True';
    falseButton.innerHTML = 'False';
    
    trueButton.addEventListener('click',getResult);
    trueButton.addEventListener('click',getResult);
    trueButton.classList.add('true-button');
    falseButton.classList.add('false-button')

    textDisplay.innerHTML = this.getAttribute('data-question');
    this.append(textDisplay,trueButton,falseButton);

  const allCards = Array.from(document.querySelectorAll('.card'));
  
        allCards.forEach(card=>card.removeEventListener('click',flipCard));
}

function getResult(){
    const allCards = Array.from(document.querySelectorAll('.card'));
  
        allCards.forEach(card=>card.removeEventListener('click',flipCard));
    const cardOfButton = this.parentElement
    if(cardOfButton.getAttribute('data-answer') === this.innerHTML){
        score = score + parseInt(cardOfButton.getAttribute('data-value'));
        getScore.innerHTML = score;
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)

            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        }, 100);

    }else{
        cardOfButton.classList.add('wrong-answer');
        setTimeout(()=>{
            while (cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)

            }
            cardOfButton.innerHTML = 0;


        },100)
    }
  cardOfButton.removeEventListener('click',flipCard)
}