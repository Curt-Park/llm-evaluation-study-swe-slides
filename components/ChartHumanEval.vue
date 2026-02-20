<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart, LineController, LineElement, PointElement,
  LinearScale, CategoryScale, Filler, Tooltip, Legend, Title
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend, Title)

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: ['2021\nCodex', '2022\ncode-davinci', '2023\nGPT-4', '2024\nGPT-4o', '2024\nClaude 3 Opus', '2024\nLlama 3.1 405B', '2024\no1'],
      datasets: [{
        label: 'pass@1 (%)',
        data: [28.8, 47.0, 67.0, 90.2, 84.9, 89.0, 96.3],
        borderColor: '#4fc3f7',
        backgroundColor: 'rgba(79, 195, 247, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 6,
        pointBackgroundColor: '#4fc3f7',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0, max: 100,
          ticks: { color: '#e0e0e0', callback: v => v + '%' },
          grid: { color: 'rgba(255,255,255,0.1)' },
          title: { display: true, text: 'pass@1 (%)', color: '#e0e0e0' }
        },
        x: {
          ticks: { color: '#e0e0e0', maxRotation: 0, font: { size: 11 } },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => `pass@1: ${ctx.parsed.y}%` }
        }
      }
    }
  })
})
</script>

<style scoped>
.chart-container {
  width: 90%;
  max-width: 800px;
  height: 340px;
  margin: 0 auto;
}
</style>
