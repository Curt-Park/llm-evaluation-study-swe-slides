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
      labels: ['Claude 3.7 Sonnet'],
      datasets: [
        {
          label: 'SWE-bench Verified (Python)',
          data: [63],
          backgroundColor: '#4fc3f7',
          borderRadius: 4,
        },
        {
          label: 'SWE-bench Multilingual',
          data: [43],
          backgroundColor: '#e57373',
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0, max: 80,
          ticks: { color: '#e0e0e0', callback: v => v + '%' },
          grid: { color: 'rgba(255,255,255,0.1)' },
          title: { display: true, text: '해결률 (%)', color: '#e0e0e0' }
        },
        x: {
          ticks: { color: '#e0e0e0' },
          grid: { display: false }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#e0e0e0', font: { size: 13 } }
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
