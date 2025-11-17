import React from "react"
import MainLayout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import PanoramaViewer from "./pages/PanoramaViewer"

const App: React.FC = () => {
    // simple pathname-based routing: render the viewer when path is /panorama-viewer
    if (typeof window !== "undefined" && window.location.pathname === "/panorama-viewer") {
        return <PanoramaViewer />
    }

    return (
        <MainLayout>
            <Dashboard />
        </MainLayout>
    )
}

export default App
