import React from "react"
import {
  Card,
} from "antd"
import PieDonut from "components/ui/Charts/PieDonut"
import useApi from "hooks/useApi";

export default function BookmarkedPieChart() {
    const { data } = useApi<{ 
        type: 'bookmark' | 'active' | 'inactive'; 
        value: number 
    }[]>('/api/panoramas/analytics/pie-chart');

    return(
        <Card title="Bookmarks" style={{ minHeight: 240 }}>
            <PieDonut
                data={data || []}
            />
        </Card>
    )
}