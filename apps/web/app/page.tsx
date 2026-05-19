"use client";

import { useEffect } from "react";
import { socket, registerSocket } from "@/lib/socket";

export default function HomePage() {
  useEffect(() => {
    // 🔥 TEMP TEST USER ID
    const userId = "test-user-1";

    registerSocket(userId);

    socket.on("match", (data) => {
      console.log("🔥 NEW MATCH:", data);

      alert("🔥 It's a Match!");
    });

    return () => {
      socket.off("match");
    };
  }, []);

  return (
    <div>
      <h1>PARAPair Real-Time Test</h1>
    </div>
  );
}