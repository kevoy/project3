var card1, card2 = null;
var pairsFound = 0;
var turns = 24;
var audioElement,audioElement2,audioElement3;
var name = null;
var multiplayer= false;
var playerTurn =1;
var p1Name =null;
var p2Name = null;
var p1Turns = 12;
var p2Turns =12;
var p1Matches=0 ;
var p2Matches = 0;
window.onload = function(){
  if(!savePresent()){
    //loadEvents();
    //start();
    loadNewGame();
  }else{
   // hideNameBox();
    //alert('*************\nThe game will continue from last state\n ->Player Name: '+JSON.parse(localStorage.name)+'\n*************');
    //loadEvents();
    //loadSaveData();
    loadSavedGame();
  }
  
}
var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K"];
  var suits = ["♣", "♦", "♥", "♠"];
  var j, k, index=0;
  var pack_size;

  // Set array of cards.
  // total number of cards
  pack_size = ranks.length * suits.length;
  var cards = [];
  

  // Fill the array with 'n' packs of cards.
  while (index < pack_size){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          console.log("k:",k,"index:",index);
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
  console.log(cards.length);
  return cards;
}
var showCards = function(cardJSON) {
txt = "<a>"+cardJSON.rank +"</a>"+ "<a>"+cardJSON.suite+"</a>";
cardHolder =  document.createElement("div");
cardHolder.className = "cardHolder";
cardBack =  document.createElement("div");   
cardBack.className = "cardBack";
//cardBack.textContent="❁";
card = document.createElement("div");
card.textContent = cardJSON.suite;
card.className = "card";
cardAfter = document.createElement("div");
cardAfter.innerHTML = txt;
cardAfter.className = "cardAfter";

cardAfterB = document.createElement("div");
cardAfterB.innerHTML = txt;
cardAfterB.className = "cardAfterB";
console.log(card);
cardHolder.onclick = checkCards;
document.querySelector(".sideBox").appendChild(cardHolder);
cardHolder.appendChild(card);
cardHolder.appendChild(cardBack);
card.appendChild(cardAfter);
card.appendChild(cardAfterB);
}

var showDeck = function(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
}

function getPairs(){
    var deck = createDeck();
    var newDeck = [];
    for(var i=0; i<8; i++){
        newDeck[i] = deck[Math.floor((Math.random()*(deck.length-1))+0)];
        newDeck[8+i] = newDeck[i];
        
    }
    return newDeck;
}

function checkCards(){
   
    if(card1 == null){
        card1 = this;
        setInvisible(this);
    }else if(card1 != null && card2==null){
        card2= this;   
        setInvisible(this);
        compareCards();
    }else if(card1 !=null && card2 !=null){
        setVisible();
        card1=this;
        setInvisible(this);
        card2=null;
    }
     audioElement2.load();
    audioElement2.play();
        
}
function compareCards(){
    var card1Txt = card1.querySelector(".card").innerHTML;
    var card2Txt = card2.querySelector(".card").innerHTML;    
    if(card1Txt == card2Txt){
        pairsFound += 1;
        card1 = null;
        card2 = null;
        audioElement.load();
        audioElement.play();
        if(playerTurn==1){
          p1Matches +=1;
        }else{
          p2Matches +=1;
        }
        displayPlayerInfo('player1NumMatches', 'Matches '+p1Matches);
        displayPlayerInfo('player2NumMatches', 'Matches ' +p2Matches);

    }else{
        
        reduceTurns();
        switchTurn();        
    }
    if(pairsFound>=8){
      //audioElement3.load();
       // audioElement3.play();
        //alert("I made u win :)");   
        getWinner();
    }
   
}
function getWinner(){
  if(multiplayer==false){
    audioElement3.load();
        audioElement3.play();
        //alert("I made u win :)");  
}else{
  if(p1Matches > p2Matches){
    alert(p1Name +" wins");
  }else{
    alert(p2Name +" wins");
  }
  audioElement3.load();
        audioElement3.play();
        //alert("I made u win :)");  
}
}
function reduceTurns(){
  if(multiplayer == false){
     if(turns <= 1){
        alert('Sigh...You Lose');
        start();
    }else{
        turns -=1;
    }
  }else{

    if(playerTurn==1){
      reducePlayer1Turns();
    }else{
      reducePlayer2Turns();
    }
      displayPlayerInfo('player1NumTurns', 'Turns Remaining '+p1Turns);
      displayPlayerInfo('player2NumTurns', 'Turns Remaining '+p2Turns);
      
  }
   
}
function displayPlayerInfo(el, info){
  document.getElementById(el).innerHTML = info;
}
function reducePlayer1Turns(){
  if(p1Turns <= 1){
        alert(p2Name + ' wins');
        start();
      }else{
        p1Turns -=1;
    }
}
function reducePlayer2Turns(){
  if(p2Turns <= 1){
        alert(p1Name + ' wins');
        start();
      }else{
        p2Turns -=1;
    }
}
function switchTurn(){
  if(playerTurn == 1){
    playerTurn = 2;
  }else{
    playerTurn = 1;
  }
}
function setVisible(){
    card1.querySelector(".cardBack").className ="cardBack visible";
    card2.querySelector(".cardBack").className ="cardBack visible";
    card1.querySelector(".card").className ="card";
    card2.querySelector(".card").className ="card";
}
function setInvisible(card){
    card.querySelector(".cardBack").className ="cardBack invisible";
    card.querySelector(".card").className ="card cardVisible";
}
function randomizePairs(){
    var deck = getPairs();
    var indx=0;
    var pair1, pair2=0;
    for(var i=0; i<8; i++){
        indx = Math.floor((Math.random()*(deck.length-1))+0);
        pair1 = deck[i];
        pair2 = deck[indx];
        deck[i]=pair2;
        deck[indx]=pair1;
        
    }
    return deck;
}
function loadEvents(){
    // document.querySelector("#colorTab").onclick = showColors;
    // document.querySelector("#symbolTab").onclick = showSymbols;
    
    // //colors events and symbols events
    // for(var i=1; i<=5; i++){
    //      document.querySelector('#c'+i).onclick = changeColor;
    //      document.querySelector('.s'+i).onclick = changeSymbol;
    // }
    var nameBox = document.querySelector('#playerName');
    nameBox.addEventListener('keypress', addName);
    var player1NameBox = document.querySelector('#mPlayer1Name');
    player1NameBox.addEventListener('keypress', addMultiPlayerName);
    var player2NameBox = document.querySelector('#mPlayer2Name');
    player2NameBox.addEventListener('keypress', addMultiPlayerName);
    var saveBtn = document.querySelector('#saveBox');
    saveBtn.onclick = saveGame;
    var single = document.querySelector('#single');
    single.addEventListener('click', setSinglePlayer);
    var multi = document.querySelector('#multi');
    multi.onclick = setMultiPlayer;
    var continueBtn = document.querySelector('#continueBtn');
    continueBtn.onclick = continueLoad;
}
function loadNewGame(){
  loadEvents();
  loadNewUI();
  start();
}
function loadSavedGame(){
  loadEvents();
  showElement('player1');
  showElement('player2');
  loadSavedUI();
  loadSaveData();
}
function continueLoad(){
  rollUp('continue');
}
function setMultiPlayer(){
  showElement('player1');
  showElement('player2');
  showElement("multiplayer");
  multiplayer = true;
  rollUp('mode');
}
function loadSavedUI(){
  showElement('continue');
  rollUp('load');
}
function loadNewUI(){
  showElement("mode");
  rollUp('load');
}
function showElement(el){
  document.getElementById(el).style.display = "block";
}
function hideEelement(el){
  document.getElementById(el).style.display = "none";
}
function setSinglePlayer(){
  showElement("player");
  rollUp('mode');
}
function rollUp(el){
  document.getElementById(el).className = 'mde rollup';
}
function addName(e){
  if(e.keyCode === 13){
    name = document.querySelector('#playerName').value;
    //alert(name);
    hideNameBox();
  }
}
function addMultiPlayerName(e){
  if(e.keyCode === 13){
    p1Name = document.querySelector('#mPlayer1Name').value;
    p2Name = document.querySelector('#mPlayer2Name').value;
    if(p1Name.length >0 && p2Name.length >0){
      rollUp('multiplayer');
      displayPlayerInfo('player1Name', p1Name);
      displayPlayerInfo('player1NumTurns', 'Turns Remaining 12');
      displayPlayerInfo('player1NumMatches', 'Matches: 0');

      displayPlayerInfo('player2Name', p2Name);
      displayPlayerInfo('player2NumTurns', 'Turns Remaining 12');
      displayPlayerInfo('player2NumMatches', 'Matches: 0');
    }
  }
}
function hideNameBox(){
  rollUp('player');
}
function saveGame(){
  this.style.backgroundColor = 'green';
  if(multiplayer){
    saveMultiPlayer();
  }else{
    saveSinglePlayer();
  }
  //var card1Default = card1;
  //var card2Default = card2;
  if(card1!=null){
    card1.querySelector(".cardBack").className ="cardBack visible";
    card1.querySelector(".card").className ="card";
  }
  if(card2!=null){
    card2.querySelector(".cardBack").className ="cardBack visible";
    card2.querySelector(".card").className ="card";
  }
  localStorage.cardData = JSON.stringify(document.getElementsByClassName('sideBox')[0].innerHTML);

  card1 = null;
  card2 = null;

}
function saveSinglePlayer(){
  localStorage.name = JSON.stringify(name);
  localStorage.turns = JSON.stringify(turns);
  localStorage.pairsFound = JSON.stringify(pairsFound);
  localStorage.multiplayer = JSON.stringify(multiplayer);
}
function saveMultiPlayer(){
  localStorage.multiplayer = JSON.stringify(multiplayer);
  localStorage.playerTurn = JSON.stringify(playerTurn);
  localStorage.pairsFound = JSON.stringify(pairsFound);
  localStorage.p1Name = JSON.stringify(p1Name);
  localStorage.p1Turns = JSON.stringify(p1Turns);
  localStorage.p1Matches = JSON.stringify(p1Matches);

  localStorage.p2Name = JSON.stringify(p2Name);
  localStorage.p2Turns = JSON.stringify(p2Turns);
  localStorage.p2Matches = JSON.stringify(p2Matches);
}
function savePresent(){
  if(!localStorage.cardData){

    return false;
  }
  return true;
}
function loadSaveData(){
  card1, card2 = null;
  audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'static/short-drum-roll.mp3');
    audioElement2 = document.createElement('audio');
    audioElement2.setAttribute('src', 'static/page-flip-01a.wav');
    audioElement3 = document.createElement('audio');
    audioElement3.setAttribute('src', 'static/TaDa-SoundBible.com-1884170640.wav');
  //name = JSON.parse(localStorage.name);
  //turns = JSON.parse(localStorage.turns);
  //pairsFound = JSON.parse(localStorage.pairsFound);
  if(JSON.parse(localStorage.multiplayer)==true){
    loadMultiplayerData();
  }else{
    loadSinglePlayerData();
  }
  var cardData =JSON.parse(localStorage.cardData);
  document.getElementsByClassName('sideBox')[0].innerHTML = cardData;
  //console.log(document.getElementsByClassName('sideBox')[0].getElementsByClassName('cardHolder')[0]);
  var cardHolders = document.getElementsByClassName('sideBox')[0].getElementsByClassName('cardHolder');
  for(var i=0; i<cardHolders.length; i++){
    cardHolders[i].onclick = checkCards;
  }

}
function loadSinglePlayerData(){
   name = JSON.parse(localStorage.name);
  turns = JSON.parse(localStorage.turns);
  pairsFound = JSON.parse(localStorage.pairsFound);
}
function loadMultiplayerData(){
   multiplayer = JSON.parse(localStorage.multiplayer);
   playerTurn = JSON.parse(localStorage.playerTurn);
  pairsFound = JSON.parse(localStorage.pairsFound);
   p1Name = JSON.parse(localStorage.p1Name);
   p1Turns = JSON.parse(localStorage.p1Turns);
   p1Matches = JSON.parse(localStorage.p1Matches);
  
   p2Name = JSON.parse(localStorage.p2Name);
   p2Turns = JSON.parse(localStorage.p2Turns);
   p2Matches = JSON.parse(localStorage.p2Matches);

   displayPlayerInfo('player1Name', p1Name);
    displayPlayerInfo('player1NumTurns', 'Turns Remaining: '+p1Turns);
    displayPlayerInfo('player1NumMatches', 'Matches: '+ p1Matches);

    displayPlayerInfo('player2Name', p2Name);
    displayPlayerInfo('player2NumTurns', 'Turns Remaining: '+p2Turns);
    displayPlayerInfo('player2NumMatches', 'Matches: '+p2Matches);
}
function changeSymbol(){
    var newSymbol = this.textContent;
    var cards = document.getElementsByClassName('cardBack');
    //alert(cards);
    for(var i=0; i<cards.length; i++){
        cards[i].textContent = newSymbol;
    }    
}
function changeColor(){
    var newColor = 
        window.getComputedStyle(this, null).backgroundColor;
    var cards = document.getElementsByClassName('cardBack');
    //alert(cards);
    for(var i=0; i<cards.length; i++){
        cards[i].style.backgroundColor = newColor;
    }
}
function showColors(){
    document.querySelector("#colors").style.display = 'inline-block';
    document.querySelector("#symbols").style.display = 'none';
}
function showSymbols(){
    document.querySelector("#symbols").style.display = 'inline-block';
    document.querySelector("#colors").style.display = 'none';
}
function start(){
    card1, card2 = null;
    pairsFound = 0;
    turns = 24;
    audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'static/short-drum-roll.mp3');
    audioElement2 = document.createElement('audio');
    audioElement2.setAttribute('src', 'static/page-flip-01a.wav');
    audioElement3 = document.createElement('audio');
    audioElement3.setAttribute('src', 'static/TaDa-SoundBible.com-1884170640.wav');
  document.querySelector(".sideBox").innerHTML = "";
  var deck = randomizePairs();
  showDeck(deck);
}

