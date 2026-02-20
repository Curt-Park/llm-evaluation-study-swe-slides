const chartInstances = {};

function initChartsOnSlide(slide) {
    const canvases = slide.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (chartInstances[canvas.id]) return;
        const initFn = chartInitializers[canvas.id];
        if (initFn) {
            chartInstances[canvas.id] = initFn(canvas);
        }
    });
}

const chartInitializers = {

    // 1. SE 벤치마크 분포 (파이 차트)
    'chart-se-distribution': (canvas) => {
        return new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['코딩 (~43%)', '테스팅 (~15%)', '프로그램 리페어 (~12%)', '취약점 탐지 (~8%)', '코드 요약 (~7%)', '기타 (~15%)'],
                datasets: [{
                    data: [43, 15, 12, 8, 7, 15],
                    backgroundColor: [
                        '#4fc3f7',
                        '#81c784',
                        '#ffb74d',
                        '#e57373',
                        '#ba68c8',
                        '#90a4ae',
                    ],
                    borderColor: '#1a1a2e',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#e0e0e0', font: { size: 14 }, padding: 16 }
                    },
                    title: {
                        display: true,
                        text: 'SE 벤치마크 분포 (291개, 2025)',
                        color: '#e0e0e0',
                        font: { size: 16 }
                    }
                }
            }
        });
    },

    // 2. HumanEval 성능 추이 (라인 차트)
    'chart-humaneval-timeline': (canvas) => {
        return new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['2021\nCodex', '2022\ncode-davinci', '2023\nGPT-4', '2024\nGPT-4o', '2024\nClaude 3 Opus', '2024\nLlama 3.1 405B', '2025\no1'],
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
                        callbacks: {
                            label: ctx => `pass@1: ${ctx.parsed.y}%`
                        }
                    }
                }
            }
        });
    },

    // 3. SWE-bench Verified 리더보드 (수평 바 차트)
    'chart-swebench-verified': (canvas) => {
        return new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Claude Opus 4.5', 'Claude Opus 4.6', 'MiniMax M2.5', 'GPT-5.2', 'GLM-5', 'Claude Sonnet 4.5', 'Gemini 3 Pro'],
                datasets: [{
                    label: '해결률 (%)',
                    data: [80.9, 80.8, 80.2, 80.0, 77.8, 77.2, 76.2],
                    backgroundColor: [
                        '#4fc3f7', '#4fc3f7', '#81c784', '#ffb74d', '#ba68c8', '#4fc3f7', '#e57373'
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
        });
    },

    // 4. Python vs Multilingual 성능 비교 (그룹 바 차트)
    'chart-multilingual': (canvas) => {
        return new Chart(canvas, {
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
                    },
                    annotation: {
                        annotations: {}
                    }
                }
            }
        });
    },

    // 5. 오염도 그래디언트 (그룹 바 차트)
    'chart-contamination': (canvas) => {
        return new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['SWE-bench Verified', 'SWE-bench Full', '외부 레포지토리'],
                datasets: [
                    {
                        label: '최고 정확도',
                        data: [76, 71, 68],
                        backgroundColor: '#e57373',
                        borderRadius: 4,
                    },
                    {
                        label: '최저 정확도',
                        data: [60, 57, 50],
                        backgroundColor: '#ffb74d',
                        borderRadius: 4,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 30, max: 85,
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
        });
    },

    // 6. SWE-bench Pro Public vs Private (그룹 바 차트)
    'chart-swebench-pro': (canvas) => {
        return new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Claude Opus 4.1', 'GPT-5'],
                datasets: [
                    {
                        label: 'Public (GPL)',
                        data: [22.7, 23.1],
                        backgroundColor: '#4fc3f7',
                        borderRadius: 4,
                    },
                    {
                        label: 'Private (비공개)',
                        data: [17.8, 14.9],
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
                        min: 0, max: 30,
                        ticks: { color: '#e0e0e0', callback: v => v + '%' },
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        title: { display: true, text: '해결률 (%)', color: '#e0e0e0' }
                    },
                    x: {
                        ticks: { color: '#e0e0e0', font: { size: 14 } },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#e0e0e0', font: { size: 13 } }
                    }
                }
            }
        });
    },
};
