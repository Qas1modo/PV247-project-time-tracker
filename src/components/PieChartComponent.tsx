import { DefaultizedPieValueType, PieItemIdentifier } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";

export type PieChartRecord = {
    id: number;
    value: number;
    label: string;
    color?: string;
  };
  

const PieChartComponent = ({
    data,
    handleClick,
  }: {
    data: PieChartRecord[];
    handleClick?: (
      _event: React.MouseEvent<SVGPathElement, MouseEvent>,
      _itemIdentifier: PieItemIdentifier,
      item: DefaultizedPieValueType
    ) => void;
  }) => {
    return (
      <PieChart
        onClick={handleClick}
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={300}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
            padding: 30,
            labelStyle: {
              fontSize: 15,
              fill: "white",
            },
          },
        }}
      />
    );
  };
  
  export default PieChartComponent;