export interface BpCategory {
  name: string;
  value: number;
}

export interface BpData {
  id: string;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  category: BpCategory;
}

export interface BpAverages {
  systolic: number;
  diastolic: number;
  category: string;
}

const bpNormal: BpCategory = {
  value: 0,
  name: 'Normal'
}
const bpElevated: BpCategory = {
  value: 1,
  name: 'Elevated blood pressure'
}
const bpHigh1: BpCategory = {
  value: 2,
  name: 'Stage 1 high blood pressure (hypertension)'
}
const bpHigh2: BpCategory = {
  value: 3,
  name: 'Stage 2 high blood pressure (hypertension)'
}

export const getCategory = (systolic: number, diastolic: number): BpCategory => {
  let category = bpNormal;
  if (systolic >= 120 || diastolic >= 80) {
    if (isBetween(systolic, 120, 129) || isBetween(diastolic, 80, 89)) category = bpElevated;
    if (isBetween(systolic, 120, 129) || isBetween(diastolic, 80, 89)) category = bpHigh1;
    if (isBetween(systolic, 140, 200) || isBetween(diastolic, 90, 200)) category = bpHigh2;
  }
  return category;
}

const getCategoryName = (value: number) => {
  switch (value) {
    case 0: return bpNormal.name;
    case 1: return bpElevated.name;
    case 2: return bpHigh1.name;
    case 3: return bpHigh2.name;
  }
  return '';
}

const isBetween = (value: number, min: number, max: number) => value >= min && value <= max;


export const getBpAverages = (data: BpData[]): BpAverages => {
  const systolic = data.map(x => x.systolic);
  const diastolic = data.map(x => x.diastolic);
  const category = data.map(x => x.category.value);
  return {
    systolic: getTotal(systolic),
    diastolic: getTotal(diastolic),
    category: getCategoryName(getTotal(category)),
  }
}

const getTotal = (data: number[]): number => {
  let total = 0;
  for (const i of data) {
    total += i;
  }
  return Math.floor(total / data.length)
}


export const chartData = (data: BpData[]) => {
  return {
    labels: data.map(x => x.date).reverse(),
    datasets: [
      {
        color: '#fff',
        data: data.map(x => x.systolic).reverse(),
        label: 'Systolic',
        tension: 0.5,
      },
      {
        color: '#fff',
        data: data.map(x => x.diastolic).reverse(),
        label: 'Diastolic',
        tension: 0.5,
      },
      {
        color: '#fff',
        data: data.map(x => x.category.value * 2).reverse(),
        label: 'Category',
        tension: 0.5,
      }
    ]
  }
}
