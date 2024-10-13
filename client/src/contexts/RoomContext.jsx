import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState({});
  const { userRole } = useAuth();

  useEffect(() => {
    const roomData = {
      fy: {
        id: "fy",
        name: "First Year",
        allowedRoles: ["fy", "alumni", "faculty"],
      },
      sy: {
        id: "sy",
        name: "Second Year",
        allowedRoles: ["sy", "alumni", "faculty"],
      },
      ty: {
        id: "ty",
        name: "Third Year",
        allowedRoles: ["ty", "alumni", "faculty"],
      },
      by: {
        id: "by",
        name: "Fourth Year",
        allowedRoles: ["by", "alumni", "faculty"],
      },
      alumni: {
        id: "alumni",
        name: "Alumni",
        allowedRoles: ["alumni", "faculty"],
      },
      faculty: { id: "faculty", name: "Faculty", allowedRoles: ["faculty"] },
    };
    setRooms(roomData);
  }, []);

  return (
    <RoomContext.Provider value={{ rooms, userRole }}>
      {children}
    </RoomContext.Provider>
  );
};
