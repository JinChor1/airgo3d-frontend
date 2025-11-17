import React from "react"
import {
  Card,
} from "antd"
import StackedBar from "components/ui/Charts/StackedBar"
import useApi from "hooks/useApi";
import { MehOutlined } from "@ant-design/icons"

export default function UploadedBarChart() {
    const { data, loading } = useApi<{ 
        monthYear: string;
        type: 'bookmark' | 'active' | 'inactive';
        value: number 
    }[]>('/api/panoramas/analytics/bar-chart');

    return(
        <Card title="Uploaded Panoramas" style={{ minHeight: 240, display: 'block' }}>
            { data && data.length > 0 && !loading ? 
                <StackedBar data={data || []} />
            : 
                <div style={{ 
                    height: 300,  
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#999'   
                }}>
                    <MehOutlined style={{ fontSize: 26 }} />
                    Not enough data to display chart.
                </div>
            }
        </Card>
    )
}