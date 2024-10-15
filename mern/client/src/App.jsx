import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


import { AuthProvider } from '../../services/AuthContext';


const App = () => {
  return (
      <AuthProvider>

              <div className="w-full p-6">
                  <Navbar />
                  
                  <Outlet />
              </div>

      </AuthProvider>
  );
};

export default App

