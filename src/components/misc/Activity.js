import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const ActivityChart = ({ activity }) => {

    const [mode, setMode] = useState(localStorage.getItem('darkMode'))

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Flashcards Passed',
                data: [],
                backgroundColor: '#774fd1',

            },
            {
                label: 'Flashcards Learned',
                data: [],
                backgroundColor: '#4cb9a5',
            },
        ],
    })

    const options = {
        color: 'white',
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: mode === 'dark' ? 'aliceblue' : 'black',
                    font: {
                        family: "Exo",
                        size: 16
                    },
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            },
            x: {
                ticks: {
                    color: mode === 'dark' ? 'aliceblue' : 'black',
                    font: {
                        size: 18,
                        family: "Exo"
                    },
                    stepSize: 1,
                    beginAtZero: true
                },
                grid: {
                    color: mode === 'dark' ? 'aliceblue' : 'black',
                    display: false
                },
                border: {
                    display: false
                }
            }
        }

    };

    useEffect(() => {
        if (activity && activity !== null && activity !== undefined) {
            setData({
                labels,
                datasets: [
                    {
                        label: 'Flashcards Passed',
                        data: [activity.monday.flashcardsPassed, activity.tuesday.flashcardsPassed, activity.wednesday.flashcardsPassed, activity.thursday.flashcardsPassed, activity.friday.flashcardsPassed, activity.saturday.flashcardsPassed, activity.sunday.flashcardsPassed],
                        backgroundColor: '#774fd1',
                        borderRadius: 5

                    },
                    {
                        label: 'Flashcards Learned',
                        data: [activity.monday.flashcardsLearned, activity.tuesday.flashcardsLearned, activity.wednesday.flashcardsLearned, activity.thursday.flashcardsLearned, activity.friday.flashcardsLearned, activity.saturday.flashcardsLearned, activity.sunday.flashcardsLearned],
                        backgroundColor: '#4cb9a5',
                        borderRadius: 5
                    },
                ],
            })
        }
    }, [activity])

    return <Bar options={options} data={data} />;
}

const ActivityProgress = ({ goals }) => {

    const [mode, setMode] = useState(localStorage.getItem('darkMode'))

    const data = {
        labels: ['Progress', 'Milestone'],
        datasets: [
            {
                backgroundColor: ['	hsl(258, 59%, 56%)', '	hsl(258, 59%, 26%,0.5)'],
                data: [goals ? goals.daily.progress : 0, goals ? goals.daily.goal - goals.daily.progress : 0],
                borderWidth: 1,
                borderColor: ['	hsl(258, 59%, 56%)', '	hsl(258, 59%, 26%,0.5)'],
                label: 'Daily'
            },
            {
                backgroundColor: ['	hsl(169, 44%, 51%)', '	hsl(169, 44%, 21%,0.5)'],
                data: [goals ? goals.weekly.progress : 0, goals ? goals.weekly.goal - goals.weekly.progress : 0],
                borderWidth: 0,
                borderColor: ['	hsl(169, 44%, 51%)', '	hsl(169, 44%, 21%,0.5)'],
                label: 'Weekly'
            },
            {
                backgroundColor: ['hsl(285, 86%, 80%)', 'hsl(285, 86%, 30%, 0.5)'],
                data: [goals ? goals.monthly.progress : 0, goals ? goals.monthly.goal - goals.monthly.progress : 0],
                borderWidth: 0,
                borderColor: ['hsl(285, 86%, 80%)', 'hsl(285, 86%, 30%, 0.5)'],
                label: 'Monthly'
            }
        ],
    };

    const options = {
        color: 'white',
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `Today's Progress: ${goals ? goals.daily.progress : 0} / ${goals ? goals.daily.goal : 0}`,
                color: mode === 'dark' ? 'aliceblue' : 'black',
                font: {
                    family: 'Exo',
                    weight: 300,
                    size: '16px'
                },
                position: 'bottom'
            }
        },
    };

    return <Pie data={data} type='pie' options={options} />;
}

export { ActivityChart, ActivityProgress };