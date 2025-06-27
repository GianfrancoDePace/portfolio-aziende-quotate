import React from "react";
import { Text } from "react-native";
import modalStyles from "../../style/ModalStyle"; // Adatta il percorso
import BaseLineChart from "./base/BaseLineChart";

interface DailyPercentageChangeChartProps {
  historyData: any;
  days?: number;
}

// Funzione Helper per Daily Percentage Change Data (spostata qui)
function getDailyPercentageChange(historyData: any, days: number = 30) {
  const defaultReturn = { data: [], xLabels: [], maxValue: 0, minValue: 0 };
  if (
    !historyData ||
    !historyData["Time Series (Daily)"] ||
    typeof historyData["Time Series (Daily)"] !== "object"
  ) {
    return defaultReturn;
  }

  const daily = historyData["Time Series (Daily)"];
  const dates = Object.keys(daily).sort().reverse();

  const percentageChanges: { value: number }[] = [];
  const xLabels: string[] = [];
  let currentMaxValue = -Infinity;
  let currentMinValue = Infinity;

  dates.slice(0, days).reverse().forEach(date => {
    const openPrice = Number(daily[date]["1. open"]);
    const closePrice = Number(daily[date]["4. close"]);

    if (openPrice !== 0) {
      const change = ((closePrice - openPrice) / openPrice) * 100;
      const value = parseFloat(change.toFixed(2));
      percentageChanges.push({ value: value });
      const d = new Date(date);
      xLabels.push(`${d.getDate()}/${d.getMonth() + 1}`);

      if (value > currentMaxValue) currentMaxValue = value;
      if (value < currentMinValue) currentMinValue = value;
    } else {
      percentageChanges.push({ value: 0 });
      const d = new Date(date);
      xLabels.push(`${d.getDate()}/${d.getMonth() + 1}`);
    }
  });

  const finalMaxValue = percentageChanges.length > 0 ? currentMaxValue * 1.2 : 10;
  const finalMinValue = percentageChanges.length > 0 ? currentMinValue * 1.2 : -10;

  return {
    data: percentageChanges,
    xLabels: xLabels,
    maxValue: finalMaxValue,
    minValue: finalMinValue
  };
}

export default function DailyPercentageChangeChart({ historyData, days = 30 }: DailyPercentageChangeChartProps) {
  const chartData = getDailyPercentageChange(historyData, days);

  return (
    <>
      <Text style={modalStyles.modalTitle}>Variazione Percentuale Giornaliera</Text>
      <BaseLineChart
        data={chartData.data}
        xLabels={chartData.xLabels}
        maxValue={chartData.maxValue}
      />
    </>
  );
}