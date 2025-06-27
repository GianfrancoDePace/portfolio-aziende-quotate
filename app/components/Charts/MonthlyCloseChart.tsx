import React from "react";
import { Text } from "react-native";
import modalStyles from "../../style/ModalStyle";
import BaseLineChart from "./base/BaseLineChart";

interface MonthlyCloseChartProps {
  historyData: any;
  months?: number;
}

function getMonthlyFirstCloseData(historyData: any, months: number = 12) {
  const defaultReturn = { data: [], xLabels: [], maxValue: 0, minValue: 0 };
  if (
    !historyData ||
    !historyData["Time Series (Daily)"] ||
    typeof historyData["Time Series (Daily)"] !== "object"
  ) {
    return defaultReturn;
  }

  const daily = historyData["Time Series (Daily)"];
  const dates = Object.keys(daily).sort();

  const monthlyData: Record<string, { date: string; close: number }> = {};

  dates.forEach(date => {
    const [year, month] = date.split("-");
    const key = `${year}-${month}`;
    if (!monthlyData[key]) {
      monthlyData[key] = { date, close: Number(daily[date]["4. close"]) };
    }
  });

  const lastMonths = Object.values(monthlyData).slice(-months);

  const data = lastMonths.map(item => ({ value: item.close }));
  const xLabels = lastMonths.map(item => {
    const d = new Date(item.date);
    return `${d.getMonth() + 1}/${d.getFullYear().toString().slice(-2)}`;
  });

  let currentMaxValue = -Infinity;
  
  data.forEach(item => {
    if (item.value > currentMaxValue) currentMaxValue = item.value;
  });
  const finalMaxValue = data.length > 0 ? currentMaxValue * 1.1 : 100;


  return {
    data: data,
    xLabels: xLabels,
    maxValue: finalMaxValue,
  };
}

export default function MonthlyCloseChart({ historyData, months = 12 }: MonthlyCloseChartProps) {
  const chartData = getMonthlyFirstCloseData(historyData, months);

  return (
    <>
      <Text style={modalStyles.modalTitle}>Andamento chiusura mensile (primo close)</Text>
      <BaseLineChart
        data={chartData.data}
        xLabels={chartData.xLabels}
        maxValue={chartData.maxValue}
      />
    </>
  );
}