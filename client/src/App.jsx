import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/registration/Login.jsx";
import Signup from "./components/registration/Signup.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { ChoosePage } from "./components/registration/Choose.jsx";
import { Layout } from "./components/Layout.jsx";
import { Welcome } from "./components/Welcome.jsx";
import { FY } from "./components/chats/FY.jsx";
import { SY } from "./components/chats/SY.jsx";
import { TY } from "./components/chats/TY.jsx";
import { BY } from "./components/chats/BY.jsx";
import { Faculty } from "./components/chats/Faculty.jsx";
import { Alumni } from "./components/chats/Alumni.jsx";
import { Profile } from "./components/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="fy" element={<FY />} />
            <Route path="sy" element={<SY />} />
            <Route path="ty" element={<TY />} />
            <Route path="by" element={<BY />} />
            <Route path="alumni" element={<Alumni />} />
            <Route path="faculty" element={<Faculty />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/choose" element={<ChoosePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
