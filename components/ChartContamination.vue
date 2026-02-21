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
      labels: ['SWE-bench Verified', 'SWE-bench Full', 'SWE-bench Extra', '외부 레포지토리'],
      datasets: [
        {
          label: '파일 경로 정확도 (최고값)',
          data: [76, 71, 68, 53],
          backgroundColor: ['#e57373', '#ef9a9a', '#ffb74d', '#81c784'],
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 30, max: 90,
          ticks: { color: '#e0e0e0', callback: v => v + '%' },
          grid: { color: 'rgba(255,255,255,0.1)' },
          title: { display: true, text: '파일 경로 식별 정확도 (%)', color: '#e0e0e0' }
        },
        x: {
          ticks: { color: '#e0e0e0', font: { size: 12 } },
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
