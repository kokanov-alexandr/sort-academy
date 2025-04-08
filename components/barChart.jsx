import React, { useMemo } from "react";

const BarChart = ({ data, containerHeight }) => {
  const max = useMemo(() => {
    return Math.max(...data);
  }, [data]);

  const barStyle = (value) => {
    const barHeight = (value / max) * containerHeight;
    return {
      height: barHeight,
      width: "200px",
      backgroundColor: "blue",
    };
  };

  return (
    <div
      className={`bar-chart-container`}
      style={{
        height: "500px",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {data.map((value, index) => (
        <div key={index} className="bar" style={barStyle(value)}></div>
      ))}
      <style jsx>{`
        .bar-chart-container {
          border: 1px solid #ccc;
          overflow: hidden;
        }
        .bar {
          width: 10px;
          background-color: blue;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default BarChart;
