import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/registration/Login.jsx";
import Signup from "./components/registration/Signup.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { ChoosePage } from "./components/registration/Choose.jsx";
import { Layout } from "./components/Layout.jsx";
import { Welcome } from "./components/Welcome.jsx";
import { Profile } from "./components/profile/Profile.jsx";
import { ChatRoom } from "./components/chats/ChatRoom.jsx";
import { RoomProvider } from "./contexts/RoomContext.jsx";
import { ToastProvider } from "./hooks/useToast.jsx";
import { AdminDashboard } from "./components/Admin.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <RoomProvider>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/chat" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path=":roomId" element={<ChatRoom />} />
                  </Route>
                  <Route path="/" element={<Layout />}>
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route path="/choose" element={<ChoosePage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </RoomProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
