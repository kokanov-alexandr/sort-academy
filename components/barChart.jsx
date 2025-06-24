import React, { useMemo } from "react";

const BarChart = ({ data, containerHeight, barColor }) => {
  const max = useMemo(() => {
    return Math.max(...data);
  }, [data]);

  const barStyle = (value, index) => {
    const barHeight = (value / max) * containerHeight;
    const style = {
      height: barHeight,
      width: "32px",
      borderRadius: "2px 2px 0 0",
      margin: "0 3px",
      transition: "none",
      display: "inline-block",
    };
    if (barColor) {
      style.backgroundColor = barColor;
      style.background = "none";
    } else {
      style.background = "#93c5fd";
    }
    return style;
  };

  return (
    <div
      id="sort-elements-bar"
      className={`bar-chart-container`}
      style={{
        height: "500px",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {data.map((value, index) => (
        <div key={index} className="bar" style={barStyle(value, index)}></div>
      ))}
      <style jsx>{`
        .bar-chart-container {
          overflow: hidden;
        }
        .bar {
          width: 32px;
          background: #93c5fd;
          border-radius: 2px 2px 0 0;
          margin: 0 3px;
          transition: none;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default BarChart;
