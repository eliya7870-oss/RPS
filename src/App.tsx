import { useRef, useState } from "react";
import "./App.css";
import rock from "./assets/rock.png";
import paper from "./assets/paper.png";
import scissors from "./assets/scissors.png";

function App() {
  type Move = "rock" | "paper" | "scissors";
  type Result = "win" | "lose" | "tie";
  const [playerMove, setPlayerMove] = useState<null | Move>(null);
  const [pcMove, setPcMove] = useState<null | Move>(null);
  const [res, setRes] = useState<null | Result>(null);
  const [games, setGames] = useState({
    win: 0,
    lose: 0,
    tie: 0,
    winstreak: 0,
    highscore: 0,
  });
  const imageDict = { rock: rock, paper: paper, scissors: scissors };
  const [auto, setAuto] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);

  function toggleInterval() {
    if (auto) {
      // stop
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setAuto(false);
    } else {
      // start
      intervalRef.current = window.setInterval(() => {
        play(makeMove());
      }, 500);
      setAuto(true);
    }
  }

  function makeMove() {
    let rand = Math.random();
    let move = "";
    if (rand >= 0 && rand < 1 / 3) {
      move = "rock";
    } else if (rand >= 1 / 3 && rand < 2 / 3) {
      move = "paper";
    } else {
      move = "scissors";
    }
    return move as Move;
  }

  function play(playerMove: Move) {
    let move = makeMove();
    setPcMove(move);
    setPlayerMove(playerMove);

    if (playerMove === move) {
      setRes("tie");
      setGames((prev) => ({ ...prev, tie: prev.tie + 1 }));
    } else if (
      (playerMove === "rock" && move === "scissors") ||
      (playerMove === "paper" && move === "rock") ||
      (playerMove === "scissors" && move === "paper")
    ) {
      setRes("win");
      setGames((prev) => ({
        ...prev,
        win: prev.win + 1,
        winstreak: prev.winstreak + 1,
        highscore:
          prev.winstreak + 1 >= prev.highscore
            ? prev.winstreak + 1
            : prev.highscore,
      }));
    } else {
      setRes("lose");
      setGames((prev) => ({ ...prev, lose: prev.lose + 1, winstreak: 0 }));
    }
  }

  return (
    <>
      <button
        onClick={() => {
          play("rock");
        }}
        className="rps-button"
      >
        <img className="rps-img" src={rock} />
      </button>
      <button
        onClick={() => {
          play("paper");
        }}
        className="rps-button"
      >
        <img className="rps-img" src={paper} />
      </button>
      <button
        onClick={() => {
          play("scissors");
        }}
        className="rps-button"
      >
        <img className="rps-img" src={scissors} />
      </button>
      {res && <h1>you {res}!</h1>}
      {playerMove && pcMove && (
        <h1>
          you: <img className="rps-img-small" src={imageDict[playerMove]} /> pc:{" "}
          <img className="rps-img-small" src={imageDict[pcMove]} />
        </h1>
      )}
      <h1>
        lose: {games.lose},win: {games.win},tie: {games.tie}
      </h1>
      <h1>
        win percent:{" "}
        {games.win
          ? ((100 * games.win) / (games.lose + games.win)).toPrecision(4)
          : "0"}
        %
      </h1>
      <h1>{`winstreak: ${games.winstreak} highscore: ${games.highscore}`}</h1>
      <button onClick={toggleInterval}>
        {auto ? "stop auto play" : "start auto play"}
      </button>
    </>
  );
}

export default App;
