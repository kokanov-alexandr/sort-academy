import React, { useMemo, useRef, useEffect, useState } from "react";

const BarChart = ({ data, containerHeight, barColor }) => {
  const max = useMemo(() => {
    return Math.max(...data);
  }, [data]);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const barWidth =
    data.length > 0
      ? Math.max((containerWidth - data.length * 6) / data.length, 5)
      : 0; // 6px margin per bar

  const barStyle = (value, index) => {
    const barHeight = (value / max) * containerHeight;
    const style = {
      height: barHeight,
      width: barWidth,
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
      ref={containerRef}
      style={{
        height: "500px",
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
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
