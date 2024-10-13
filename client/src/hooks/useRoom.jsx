import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";

export const useRoom = () => {
  return useContext(RoomContext);
};
