import React from "react"
import {
  Row,
  Col,
} from "antd"
import UploadedBarChart from "./UploadedBarChart"
import BookmarkedPieChart from "./BookmarkedPieChart"

export default function ChartRow() {
    return (
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={16}>
                <UploadedBarChart />
            </Col>
            <Col xs={24} lg={8}>
                <BookmarkedPieChart />
            </Col>
        </Row>
    )
}