import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import LoadingSpinner from "../Shared/LoadingSpinner";

const options = {
  title: "Joining Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};
const JoiningsLineChart = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner smallHeight />
      ) : data.length > 1 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          data={data}
          options={options}
        />
      ) : (
        <>
          <LoadingSpinner smallHeight />
          <p className="text-center">
            Not enough data available for this section!
          </p>
        </>
      )}
    </>
  );
};

JoiningsLineChart.propTypes = {
  data: PropTypes.array,
};

export default JoiningsLineChart;
