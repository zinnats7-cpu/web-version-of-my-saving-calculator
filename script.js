// Grab references to the HTML elements we'll need to read from or update.
const startingAmountInput = document.getElementById("starting-amount");
const monthlyContributionInput = document.getElementById("monthly-contribution");
const annualRateInput = document.getElementById("annual-rate");
const yearsInput = document.getElementById("years");
const calculateBtn = document.getElementById("calculate-btn");
const resultParagraph = document.getElementById("result");
const chartCanvas = document.getElementById("growth-chart");

let myChart = null; // will hold the chart so we can destroy/redraw it each time

// This function does the same job as calculate_growth() in the Python version.
function calculateGrowth(startingAmount, monthlyContribution, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    let balance = startingAmount;
    const balances = [balance];

    for (let month = 1; month <= totalMonths; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
        balances.push(balance);
    }

    return balances;
}

// Draws (or redraws) the line chart using the balances array.
function drawChart(balances) {
    const yearLabels = balances.map(function (value, index) {
        return (index / 12).toFixed(1);
    });

    if (myChart !== null) {
        myChart.destroy();
    }

    myChart = new Chart(chartCanvas, {
        type: "line",
        data: {
            labels: yearLabels,
            datasets: [{
                label: "Balance ($)",
                data: balances,
                borderColor: "#2E86AB",
                backgroundColor: "rgba(46, 134, 171, 0.1)",
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: "Years" } },
                y: { title: { display: true, text: "Balance ($)" } }
            }
        }
    });
}

// This runs every time the button is clicked.
calculateBtn.addEventListener("click", function () {
    const startingAmount = parseFloat(startingAmountInput.value);
    const monthlyContribution = parseFloat(monthlyContributionInput.value);
    const annualRate = parseFloat(annualRateInput.value);
    const years = parseFloat(yearsInput.value);

    const balances = calculateGrowth(startingAmount, monthlyContribution, annualRate, years);
    const finalBalance = balances[balances.length - 1];

    const totalContributed = startingAmount + monthlyContribution * years * 12;
    const interestEarned = finalBalance - totalContributed;

    resultParagraph.innerHTML =
        "Total contributed: $" + totalContributed.toFixed(2) + "<br>" +
        "Interest earned: $" + interestEarned.toFixed(2) + "<br>" +
        "Final balance: $" + finalBalance.toFixed(2);

    drawChart(balances);
});

