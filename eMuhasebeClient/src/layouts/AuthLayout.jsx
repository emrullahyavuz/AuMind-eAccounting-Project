import { useState } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import "../App.css";
const AuthLayout = () => {
    const [darkMode] = useState(true);

    return (
        <div className={`app ${darkMode ? "dark" : ""}`}>
            <div className="app-container">
                <div className="content">
                    <Header />
                    <main className="">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;