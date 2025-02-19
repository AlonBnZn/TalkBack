import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { AuthAccessToken } from "./authService";

export const gameSocket = io("http://localhost:3001/game", {
  autoConnect: false,
});
const GAME_API_URL = "http://localhost:3003";
const service = axios.create({
  baseURL: GAME_API_URL,
});
const gameManager = {
  board: Array(9).fill(""),
  gameId: null,
  playerTurn: false,
  opponent: null,
  async handleStartGame(opponent, self) {
    try {
      gameSocket.connect();
      gameSocket.emit("mount", self.id);
      console.log(opponent);
      service.defaults.headers.common["Authorization"] = AuthAccessToken;
      this.opponent = opponent;
      const response = await service.post("/startgame", {
        opponent,
        self,
      });
      const { gameId } = response.data;
      this.gameId = gameId;
      this.playerTurn = true;
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error);
        return;
      }
      gameSocket.disconnect();
      throw error;
    }
  },
  async handleChooseSquare(squareIndex) {
    try {
      service.defaults.headers.common["Authorization"] = AuthAccessToken;
      if (this.playerTurn) {
        console.log(this.playerTurn);
        const response = await service.post("/chooseSquare", {
          gameId: this.gameId,
          squareIndex,
        });
        const { winner, newBoard, message } = response.data;
        if (!newBoard) {
          console.log(message);
          return;
        }
        this.board = newBoard;
        if (winner) {
          return winner;
        }
        this.playerTurn = !this.playerTurn;
      } else {
        console.log("that not your turn");
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log("player disconnected");
        this.handleAlert({ isEnded: false, name: this.opponent });
      }
      console.log(error);
      gameSocket.disconnect();
    }
  },

  handleAlert(alert) {
    if (alert.isEnded)
      toast.success(`${alert.name} Won the game!`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    else
      toast.error(`${alert.name} disconnected, game closed!`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  },
};
export default gameManager;
