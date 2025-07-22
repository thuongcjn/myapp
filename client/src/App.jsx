import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="h-full overflow-auto">
      <AuthProvider>
        <NavBar />
        <section className="w-full mt-16 flex justify-center p-8">
          <Outlet />
          <ToastContainer />
        </section>
      </AuthProvider>
    </div>
  );
};

export default App;
