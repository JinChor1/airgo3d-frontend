import React from "react"
import { Layout, Button, Avatar, Space } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, BulbOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { toggleDark } from "../../../store/themeSlice"

const { Header } = Layout

export default function TopBar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
    const dispatch = useDispatch()

    return (
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
          }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Button type="text" onClick={onToggle} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
                <h3 style={{ margin: 0 }}>Dashboard</h3>
            </div>
            <Space>
                <Button type="text" onClick={() => dispatch(toggleDark())} icon={<BulbOutlined />} />
                <Avatar>AD</Avatar>
            </Space>
        </Header>
    )
}
