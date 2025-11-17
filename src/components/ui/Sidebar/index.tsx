import React from "react"
import { Layout, Menu } from "antd"
import { DashboardOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons"

const { Sider } = Layout

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            trigger={null}
            breakpoint="md"
            collapsedWidth={64}
            style={{ background: '#fff' }}
        >
            <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {collapsed ? "AD" : "Admin"}
            </div>
            <Menu mode="inline" defaultSelectedKeys={["1"]} items={[
                { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
                { key: "2", icon: <UserOutlined />, label: "Users" },
                { key: "3", icon: <SettingOutlined />, label: "Settings" }
            ]} />
        </Sider>
    )
}
