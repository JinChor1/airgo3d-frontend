import React from "react"
import { Row, Col, Card, Statistic, Table, Button, Space, Tag } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { Breakpoint as AntdBreakpoint } from "antd/es/_util/responsiveObserver"

type Item = { key: number; name: string; status: string; amount: string; date: string }

const sampleData: Item[] = Array.from({ length: 8 }).map((_, i) => ({
  key: i + 1,
  name: `Item ${i + 1}`,
  status: i % 3 === 0 ? "active" : i % 3 === 1 ? "pending" : "disabled",
  amount: (Math.random() * 1000).toFixed(2),
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}))

export default function Dashboard() {
    const columns: ColumnsType<Item> = [
        { title: "Name", dataIndex: "name", key: "name", responsive: ["sm"] as AntdBreakpoint[] },
        { title: "Status", dataIndex: "status", key: "status", render: (status: string): JSX.Element => {
            const color = status === "active" ? "green" : status === "pending" ? "gold" : "default"
            return <Tag color={color}>{status.toUpperCase()}</Tag>
        }},
        { title: "Amount", dataIndex: "amount", key: "amount", align: "right", responsive: ["md"] as AntdBreakpoint[] },
        { title: "Date", dataIndex: "date", key: "date", responsive: ["lg"] as AntdBreakpoint[] },
        {
            title: "Action",
            key: "action",
            align: "right",
            render: (_text: unknown, record: Item): JSX.Element => (
                <Space>
                    <Button type="link" icon={<EditOutlined />} onClick={() => console.log("Edit", record)} />
                    <Button type="link" danger icon={<DeleteOutlined />} onClick={() => console.log("Delete", record)} />
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card><Statistic title="Users" value={1128} /></Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card><Statistic title="Orders" value={93} /></Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card><Statistic title="Revenue" value={12432} prefix="$" /></Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card><Statistic title="Active" value={24} suffix="%" /></Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={16}>
                    <Card title="Main Chart" style={{ minHeight: 240 }}>Chart placeholder</Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Recent" style={{ minHeight: 240 }}>
                        Recent items
                    </Card>
                </Col>
            </Row>

            <Row style={{ marginTop: 16 }}>
                <Col xs={24}>
                    <Card title="Items" bordered>
                        <Table<Item>
                            columns={columns}
                            dataSource={sampleData}
                            pagination={{ pageSize: 6 }}
                            size="middle"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
