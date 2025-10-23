import { useState } from 'react'
import './App.css'

function App() {
  const [pcMove,setPcMove]=useState<null |string>(null)
  const [res,setRes]=useState<null|string>(null)
  const [games,setGames] = useState({win:0,lose:0,tie:0})

  function pcMakeMove(){
    let rand = Math.random()
    let move = ''
    if (rand>=0&&rand<1/3){
      move = 'rock'
    }
    else if (rand>=1/3&&rand<2/3){
      move = 'paper'
    }
    else{
      move ='scissors'
    }
    setPcMove(move)
    return(move)
  }
function play(playerMove:string){
  let move = pcMakeMove()
  if (playerMove ==='rock'){
    switch(move){
      case 'rock':
        setRes('tie')
        setGames(prev => ({ ...prev, tie: prev.tie++ }))
        break;
      case 'paper':
        setRes('lose')
        setGames(prev => ({ ...prev, lose: prev.lose++ }))
        break;
      case 'scissors':
        setRes('win')
        setGames(prev => ({ ...prev, win: prev.win++ }))
        break;
      default:
        console.log('invalid move')
    }
  }
  else if(playerMove==='paper'){
    switch(move){
      case 'rock':
        setRes('win')
        setGames(prev => ({ ...prev, win: prev.win++ }))
        break;
      case 'paper':
        setRes('tie')
        setGames(prev => ({ ...prev, tie: prev.tie++ }))
        break;
      case 'scissors':
        setRes('lose')
        setGames(prev => ({ ...prev, lose: prev.lose++ }))
        break;
      default:
        console.log('invalid move')
    }
  }
  else if(playerMove==='scissors'){
    switch(move){
      case 'rock':
        setRes('lose')
        setGames(prev => ({ ...prev, lose: prev.lose++ }))
        break;
      case 'paper':
        setRes('win')
        setGames(prev => ({ ...prev, win: prev.win++ }))
        break;
      case 'scissors':
        setRes('tie')
        setGames(prev => ({ ...prev, tie: prev.tie++ }))
        break;
      default:
        console.log('invalid move')
    }
  }
}
  return (
    <>
    <button onClick={()=>{play('rock')}}>rock</button>
    <button onClick={()=>{play('paper')}}>paper</button>
    <button onClick={()=>{play('scissors')}}>scissors</button>
    {res&&<h1>computer chose {pcMove}, you {res}!</h1>}
    <h1>lose: {games.lose},win: {games.win},tie: {games.tie}</h1>
      <h1>win percent: {games.win?(100*games.win/(games.lose+games.win)).toPrecision(4):'0'}%</h1>
    </>
  )
}

export default App
