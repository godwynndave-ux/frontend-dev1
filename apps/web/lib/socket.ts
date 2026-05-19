import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  autoConnect: false,
});

export function registerSocket(userId: string) {
  socket.connect();

  socket.emit("register", userId);

  console.log("🔌 Socket registered:", userId);
}