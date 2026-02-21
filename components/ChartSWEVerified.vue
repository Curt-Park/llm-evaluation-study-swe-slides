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
      labels: [
        'OpenHands + Kimi K2',
        'mini-SWE + Kimi K2 Thinking',
        'mini-SWE + Minimax M2',
        'EntroPO + Qwen3-Coder-30B',
        'mini-SWE + DeepSeek V3.2',
        'mini-SWE + Devstral small',
        'mini-SWE + Qwen3-Coder 480B',
        'mini-SWE + GLM-4.6',
        'mini-SWE + GLM-4.5',
        'mini-SWE + Devstral',
      ],
      datasets: [{
        label: '해결률 (%)',
        data: [65.40, 63.40, 61.00, 60.40, 60.00, 56.40, 55.40, 55.40, 54.20, 53.80],
        backgroundColor: [
          '#4fc3f7', '#4fc3f7', '#81c784', '#ba68c8', '#ffb74d',
          '#e57373', '#4dd0e1', '#fff176', '#a5d6a7', '#ef9a9a',
        ],
        borderRadius: 4,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 45, max: 70,
          ticks: { color: '#e0e0e0', callback: v => v + '%' },
          grid: { color: 'rgba(255,255,255,0.1)' },
        },
        y: {
          ticks: { color: '#e0e0e0', font: { size: 11 } },
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
