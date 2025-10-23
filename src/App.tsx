import { useState } from 'react'
import './App.css'
import rock from './assets/rock.png'
import paper from './assets/paper.png'
import scissors from './assets/scissors.png'


function App() {
  type Move = 'rock' | 'paper' | 'scissors';
  type Result = 'win' | 'lose' | 'tie';
  const [playerMove,setPlayerMove]=useState<null |Move>(null)
  const [pcMove,setPcMove]=useState<null |Move>(null)
  const [res,setRes]=useState<null|Result>(null)
  const [games,setGames] = useState({win:0,lose:0,tie:0})
  const imageDict = {'rock':rock,'paper':paper,'scissors':scissors}

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
    setPcMove(move as Move)
    return(move)
  }
function play(playerMove:string){
  let move = pcMakeMove()
  setPlayerMove(playerMove as Move)
  if (playerMove ==='rock'){
    switch(move){
      case 'rock':
        setRes('tie')
        setGames(prev => ({ ...prev, tie: prev.tie+1 }))
        break;
      case 'paper':
        setRes('lose')
        setGames(prev => ({ ...prev, lose: prev.lose+1 }))
        break;
      case 'scissors':
        setRes('win')
        setGames(prev => ({ ...prev, win: prev.win+1 }))
        break;
      default:
        console.log('invalid move')
    }
  }
  else if(playerMove==='paper'){
    switch(move){
      case 'rock':
        setRes('win')
        setGames(prev => ({ ...prev, win: prev.win+1 }))
        break;
      case 'paper':
        setRes('tie')
        setGames(prev => ({ ...prev, tie: prev.tie+1 }))
        break;
      case 'scissors':
        setRes('lose')
        setGames(prev => ({ ...prev, lose: prev.lose+1 }))
        break;
      default:
        console.log('invalid move')
    }
  }
  else if(playerMove==='scissors'){
    switch(move){
      case 'rock':
        setRes('lose')
        setGames(prev => ({ ...prev, lose: prev.lose+1 }))
        break;
      case 'paper':
        setRes('win')
        setGames(prev => ({ ...prev, win: prev.win+1 }))
        break;
      case 'scissors':
        setRes('tie')
        setGames(prev => ({ ...prev, tie: prev.tie+1 }))
        break;
      default:
        console.log('invalid move')
    }
  }
}

  return (
    <>
    
    <button onClick={()=>{play('rock')}} className='rps-button'><img className='rps-img' src={rock}/></button>
    <button onClick={()=>{play('paper')}} className='rps-button'><img className='rps-img' src={paper}/></button>
    <button onClick={()=>{play('scissors')}} className='rps-button'><img className='rps-img' src={scissors}/></button>
    {res&&<h1>you {res}!</h1>}
    {playerMove&&pcMove&&<h1>you: <img className='rps-img-small' src ={imageDict[playerMove]}/> pc: <img className='rps-img-small' src={imageDict[pcMove]}/></h1>}
    <h1>lose: {games.lose},win: {games.win},tie: {games.tie}</h1>
      <h1>win percent: {games.win?(100*games.win/(games.lose+games.win)).toPrecision(4):'0'}%</h1>
    </>
  )
}

export default App
