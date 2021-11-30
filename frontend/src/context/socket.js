import socketio, { Socket } from "socket.io-client";
import React from "react";

const SOCKET_URL = "ws://localhost:3001";

export const socket = socketio.connect(SOCKET_URL);

export const SocketContext = React.createContext();
