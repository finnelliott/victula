"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Entry } from '@prisma/client';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const ProgressChart = ({ entries, goals }: { entries: Entry[], goals: { calories: number, carbohydrates: number, fats: number, proteins: number }}) => {
  const totalNutrients = entries.reduce(
    (acc, entry) => {
      acc.calories += entry.calories || 0;
      acc.carbohydrates += entry.carbohydrates || 0;
      acc.fats += entry.fats || 0;
      acc.proteins += entry.proteins || 0;
      return acc;
    },
    { calories: 0, carbohydrates: 0, fats: 0, proteins: 0 }
  );

  const chartData = {
    type: 'bar',
    data: {
      labels: ['Calories', 'Carbohydrates', 'Fats', 'Proteins'],
      datasets: [
        {
          label: 'Consumed',
          data: [
            totalNutrients.calories,
            // totalNutrients.carbohydrates,
            // totalNutrients.fats,
            // totalNutrients.proteins,
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Goals',
          data: [
            goals.calories || 0,
            // goals.carbohydrates || 0,
            // goals.fats || 0,
            // goals.proteins || 0,
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: goals.calories,
        }
      }
    }
  };

  return <Bar {...chartData} />;
};

export default ProgressChart;