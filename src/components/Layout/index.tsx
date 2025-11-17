import React, { useEffect, useState } from "react"
import { Layout, Grid } from "antd"
import Sidebar from "../ui/Sidebar"
import TopBar from "../ui/TopBar"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

const { Content } = Layout
const useBreakpoint = Grid.useBreakpoint

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const screens = useBreakpoint()
    const [collapsed, setCollapsed] = useState(false)
    const darkMode = useSelector((s: RootState) => s.theme.darkMode)

    useEffect(() => {
        if (!screens.md) setCollapsed(true)
        else setCollapsed(false)
    }, [screens.md])

    return (
        <Layout className={darkMode ? "dark-theme" : undefined} style={{ minHeight: "100vh" }}>
            <Sidebar collapsed={collapsed} />
            <Layout>
                <TopBar collapsed={collapsed} onToggle={() => setCollapsed((s) => !s)} />
                <Content style={{ margin: 16, overflow: "auto" }}>{children}</Content>
            </Layout>
        </Layout>
    )
}
