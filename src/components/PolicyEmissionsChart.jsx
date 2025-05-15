// src/components/PolicyEmissionsChart.jsx
import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { decisionTree } from "../data/decisionTree";
import { allEmissions } from "../data/allEmissions";

// register the bits of Chart.js we need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PolicyEmissionsChart() {
  const node2025 = decisionTree.N_0_0;

  // 1️⃣ Step‐1 choice (N10 or N11)
  const [firstChoice, setFirstChoice] = useState("");
  // 2️⃣ Step‐2 choice (N20–N23)
  const [secondChoice, setSecondChoice] = useState("");

  // Which 2030 node to show once they've picked at 2025
  const node2030 = firstChoice
    ? decisionTree[
        node2025.options.find(
          (o) => o.effects["Greenhouse Gas Net Emissions"] === firstChoice
        )?.next
      ]
    : null;

  // Decide which effect to plot: secondChoice overrides firstChoice
  const activeEffect = secondChoice || firstChoice;

  // Baseline data is always N00
  const baselineData = allEmissions["N00"] || [];
  // Active policy data (first‐step until overwritten by second)
  const policyData = activeEffect ? allEmissions[activeEffect] || [] : [];

  // Build chartData any time activeEffect changes
  const chartData = useMemo(() => {
    if (!activeEffect) return { labels: [], datasets: [] };

    const labels = baselineData.map((d) => d.Year);

    // Baseline series
    const datasets = [
      {
        label: "Baseline",
        data: baselineData.map((d) => d["Current Scenario"]),
        borderColor: "gray",
        backgroundColor: "rgba(128,128,128,0.2)",
        fill: false,
        tension: 0.2,
      },
    ];

    // Policy series
    // Grab the human‐readable label from whichever step we're on
    const policyLabel =
      (secondChoice && node2030
        ? node2030.options.find(
            (o) =>
              o.effects["Greenhouse Gas Net Emissions"] === secondChoice
          )?.label
        : node2025.options.find(
            (o) =>
              o.effects["Greenhouse Gas Net Emissions"] === firstChoice
          )?.label) || `Scenario ${activeEffect}`;

    datasets.push({
      label: policyLabel,
      data: policyData.map((d) => d["Current Scenario"]),
      borderColor: "blue",
      backgroundColor: "rgba(0,0,255,0.2)",
      fill: false,
      tension: 0.2,
    });

    return { labels, datasets };
  }, [baselineData, policyData, activeEffect, firstChoice, secondChoice, node2030]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: !!activeEffect,
        text: activeEffect
          ? "Emissions: Baseline vs. Your Policy"
          : "",
      },
    },
    scales: {
      x: { title: { display: true, text: "Year" } },
      y: { title: { display: true, text: "Gt CO₂-eq" } },
    },
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Step 1: 2025 */}
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="select-2025" style={{ display: "block", fontWeight: 500 }}>
          {node2025.text}
        </label>
        <select
          id="select-2025"
          value={firstChoice}
          onChange={(e) => {
            setFirstChoice(e.target.value);
            setSecondChoice(""); // clear step 2 if they re-choose step 1
          }}
        >
          <option value="" disabled>— choose an option —</option>
          {node2025.options.map((opt) => {
            const code = opt.effects["Greenhouse Gas Net Emissions"];
            return (
              <option key={code} value={code}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>

      {/* Step 2: 2030 (only after step 1) */}
      {node2030 && (
        <div style={{ margin: "1rem 0" }}>
          <label htmlFor="select-2030" style={{ display: "block", fontWeight: 500 }}>
            {node2030.text}
          </label>
          <select
            id="select-2030"
            value={secondChoice}
            onChange={(e) => setSecondChoice(e.target.value)}
          >
            <option value="" disabled>— choose an option —</option>
            {node2030.options.map((opt) => {
              const code = opt.effects["Greenhouse Gas Net Emissions"];
              return (
                <option key={code} value={code}>
                  {opt.label}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Chart: appears as soon as step 1 is chosen */}
      {activeEffect && (
        <div style={{ position: "relative", height: 400, marginTop: "2rem" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
