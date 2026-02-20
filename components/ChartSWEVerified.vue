<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart, BarController, BarElement,
  LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js'

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend)

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: ['Claude Opus 4.5', 'Claude Opus 4.6', 'MiniMax M2.5', 'GPT-5.2', 'GLM-5', 'Claude Sonnet 4.5', 'Gemini 3 Pro'],
      datasets: [{
        label: '해결률 (%)',
        data: [80.9, 80.8, 80.2, 80.0, 77.8, 77.2, 76.2],
        backgroundColor: ['#4fc3f7', '#4fc3f7', '#81c784', '#ffb74d', '#ba68c8', '#4fc3f7', '#e57373'],
        borderRadius: 4,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 60, max: 85,
          ticks: { color: '#e0e0e0', callback: v => v + '%' },
          grid: { color: 'rgba(255,255,255,0.1)' },
        },
        y: {
          ticks: { color: '#e0e0e0', font: { size: 13 } },
          grid: { display: false }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => `${ctx.parsed.x}%` }
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
