import React from "react"
import Cards from "components/Dashboard/Cards"
import ChartRow from "components/Dashboard/ChartRow"
import PanoramaTable from "components/Dashboard/PanoramaTable"

export default function Dashboard() {
    return (
      <div>
        <Cards />
        <ChartRow />
        <PanoramaTable />
      </div>
    )
}
