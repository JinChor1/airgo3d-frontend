import React from "react"
import {
  Row,
  Col,
  Card,
  Statistic
} from "antd"
import TinyArea from "components/ui/Charts/TinyArea"
import useApi from "hooks/useApi"

export default function Cards() {
    const { data } = useApi<{
        total: number;
        bookmarked: number;
        unbookmarked: number;
        inactive: number
    }>('/api/panoramas/analytics/cards');

    const { data: graphData } = useApi<{
        totalUploaded: number[],
        totalBookmarked: number[],
        totalUnbookmarked: number[],
        totalInactive: number[]
    }>('/api/panoramas/analytics/daily-cards');

    return(
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <Card style={{ overflow: "hidden" }}>
                    <Statistic title="Total Uploaded (Active)" value={data?.total || 0} />
                    <TinyArea
                        color='blue'
                        data={graphData?.totalUploaded || []}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card style={{ overflow: "hidden" }}>
                    <Statistic title="Total Bookmarked" value={data?.bookmarked || 0} />
                    <TinyArea
                        color='green'
                        data={graphData?.totalBookmarked || []}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card style={{ overflow: "hidden" }}>
                    <Statistic title="Total Unbookmarked" value={data?.unbookmarked || 0} />
                    <TinyArea
                        color='purple'
                        data={graphData?.totalUnbookmarked || []}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card style={{ overflow: "hidden" }}>
                    <Statistic title="Inactive Panoramas" value={data?.inactive || 0} />
                    <TinyArea
                        color='red'
                        data={graphData?.totalInactive || []}
                    />
                </Card>
            </Col>
        </Row>
    )
}
