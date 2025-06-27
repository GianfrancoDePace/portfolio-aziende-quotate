import React from "react";
import { Text } from "react-native";
import modalStyles from "../../style/ModalStyle"; // Adatta il percorso
import BaseLineChart from "./base/BaseLineChart";

interface DailyCloseChartProps {
  historyData: any; // Tipizzare meglio HistoryData se possibile
  days?: number;
}

// Funzione Helper per Daily Close Data (spostata qui)
function getDailyCloseData(historyData: any, days: number = 30) {
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

  const data = dates
    .slice(0, days)
    .map(date => ({
      value: Number(daily[date]["4. close"])
    }))
    .reverse();

  const xLabels = dates
    .slice(0, days)
    .map(date => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    })
    .reverse();

  let currentMaxValue = -Infinity;
  let currentMinValue = Infinity;

  data.forEach(item => {
    if (item.value > currentMaxValue) currentMaxValue = item.value;
    if (item.value < currentMinValue) currentMinValue = item.value;
  });

  const finalMaxValue = data.length > 0 ? currentMaxValue * 1.1 : 100;
  const finalMinValue = data.length > 0 ? currentMinValue * 0.9 : 0;

  return {
    data: data,
    xLabels: xLabels,
    maxValue: finalMaxValue,
    minValue: finalMinValue
  };
}

export default function DailyCloseChart({ historyData, days = 30 }: DailyCloseChartProps) {
  const chartData = getDailyCloseData(historyData, days);

  return (
    <>
      <Text style={modalStyles.modalTitle}>Storico azioni giornaliero (ultimi {days} giorni)</Text>
      <BaseLineChart
        data={chartData.data}
        xLabels={chartData.xLabels}
        maxValue={chartData.maxValue}
      />
    </>
  );
}