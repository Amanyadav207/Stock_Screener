
# Stock Screening Tool


## Features

- **Query-Based Filtering**: Allows users to filter stocks by entering conditions in a sequential format, such as:
  ```
  Market Capitalization > 10000 AND
  ROE > 15 AND
  P/E Ratio < 20
  ```
- **AND-Only Logic**: All conditions specified must be met for a stock to appear in the results.
- **Sortable and Paginated Results**: Results are displayed in a tabular format with sortable columns for each parameter.
- **Responsive Design**: The interface is designed to be responsive and works smoothly on both desktop and mobile devices.

## Dataset

The tool uses a static dataset of 500 stocks, each containing the following parameters:

1. Market Capitalization – Market cap in billions
2. P/E Ratio – Price to earnings ratio
3. ROE – Return on equity as a percentage
4. Debt-to-Equity Ratio – Debt relative to shareholder equity
5. Dividend Yield – Dividend yield as a percentage
6. Revenue Growth – Revenue growth rate as a percentage
7. EPS Growth – Earnings per share growth rate as a percentage
8. Current Ratio – Measure of liquidity (assets/liabilities)
9. Gross Margin – Gross margin as a percentage

## Project Setup

### Prerequisites

Ensure you have the following software installed:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

### Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:Amanyadav207/Stock_Screener.git
   ```
2. Navigate into the project directory:
   ```bash
   cd stock-screening-tool
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm start
   ```

The application will be accessible at `http://localhost:5173`.

### Deployment

To deploy the project, follow these steps:

1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `build` folder to your preferred hosting provider (e.g., Vercel, DigitalOcean).

## Usage

1. **Enter Query**: In the query input box, type the conditions to filter stocks (e.g., `Market Capitalization > 10000 AND ROE > 15`).
2. **Run Query**: Click the **Run Query** button to apply the filters.
3. **View Results**: Stocks that meet all specified conditions will be displayed in a sortable, paginated table.

## Sample Queries

Here are some sample queries to help demonstrate functionality:

1. **Large Cap Growth Stocks**
   ```
   Market Capitalization > 10000 AND
   ROE > 15 AND
   EPS Growth > 10
   ```

2. **Dividend Value Stocks**
   ```
   Dividend Yield > 2 AND
   P/E Ratio < 20 AND
   Debt-to-Equity Ratio < 1
   ```

3. **High Liquidity Stocks**
   ```
   Current Ratio > 2 AND
   Gross Margin > 40
   ```

## Code Structure

- **src/components**: Contains the UI components like `QueryInput`, `ResultsTable`, and `Pagination`.
- **src/utils**: Contains helper functions, including `evaluateCondition` and `loadExcelData` for data processing and condition evaluation.

## Technologies Used

- **React**: For building the UI
- **JavaScript**: For filtering and data manipulation logic
- **CSS Framework**: TailwindCss
- **Deployment Platform**:Vercel


