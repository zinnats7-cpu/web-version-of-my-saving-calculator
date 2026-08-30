# Savings Calculator (Website Version)

An interactive website version of my compound interest / savings calculator. Instead of running in a terminal, this one runs in the browser, you type in your numbers, click a button, and see your results and a live chart instantly.

## Why I built this

I already built a Python version of this calculator, but it only works if someone has Python installed and knows how to run it from a terminal. I wanted a version that anyone could open with just a link and actually use, no coding knowledge required on their end. It also gave me a chance to learn how the same math I understood in Python translates into a completely different language, and how a webpage actually becomes interactive.

## What it does

You enter your starting amount, monthly contribution, annual interest rate, and number of years into a form. When you click Calculate, it works out your balance month by month using compound interest, shows a summary of how much you contributed versus how much you earned in interest, and draws a live line chart of your balance growing over time.

## How it's built

The site is built with plain HTML, CSS, and JavaScript, no frameworks. HTML handles the structure (the input boxes, labels, and button), CSS handles the styling, and JavaScript does the actual calculation and updates the page when you click the button. The chart is drawn using Chart.js, a free charting library loaded from a CDN.

```javascript
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
```

This is the same logic as the `calculate_growth()` function in my Python version, just rewritten in JavaScript. Every month, the current balance earns interest, then the monthly contribution gets added on top, and that repeats for the whole time period.

## Running it locally

Because the chart uses an external library, opening `index.html` directly by double-clicking it won't work correctly (the browser blocks some of what Chart.js needs when a page is opened as a raw local file). Instead, run a local server from inside the project folder:

```bash
python3 -m http.server
```

Then open `http://localhost:8000` in your browser.

## Project structure

```
web-version-of-my-saving-calculator/
├── index.html   # page structure and layout
├── style.css    # styling
└── script.js    # calculation logic and chart rendering
```

## Possible next features

A goal calculator mode, where instead of calculating your final balance, you enter a savings goal and it works out how much you'd need to save monthly to reach it.

Scenario comparison, showing two or three different interest rates or contribution amounts on the same chart.

## About me

I'm an international student from Bangladesh studying in British Columbia, Canada, applying to university for Fall 2027 with interests in Computer Science, Finance, and Math. This project is part of my portfolio, alongside the Python version of the same calculator.
