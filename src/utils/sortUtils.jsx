import * as XLSX from 'xlsx';
import stockFile from '../assets/Stocksdata.xlsx';
import { parameters } from './parameters';

export const loadExcelData = async (setStocks, setLoading) => {
  try {
    setLoading(true);
    const response = await fetch(stockFile);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    setStocks(jsonData);
    setLoading(false);
  } catch (error) {
    console.error('Error loading Excel file:', error);
    setLoading(false);
  }
};

export const evaluateCondition = (condition, stock) => {
  const [fieldDisplay, operator, value] = condition.split(/\s*(>|<|=)\s*/).map(x => x.trim());
  const parameter = parameters.find(p => p.display === fieldDisplay);
  if (!parameter) return true;

  const stockValue = parseFloat(stock[parameter.field]);
  const compareValue = parseFloat(value);

  if (isNaN(stockValue) || isNaN(compareValue)) return false;

  switch (operator) {
    case '>': return stockValue > compareValue;
    case '<': return stockValue < compareValue;
    case '=': return stockValue === compareValue;
    default: return false;
  }
};

