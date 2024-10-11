import { useContext } from "react";
import { SocketProvider } from "../Context/SocketWrapper";

export const useSocket = ()=> useContext(SocketProvider)
