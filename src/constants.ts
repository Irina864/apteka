import { ISorter } from './interfaces';

export const SORTER_VALUES: ISorter[] = [
  { id: 0, value: 'По релевантности' },
  { id: 1, value: 'Сначала дешевые' },
  { id: 2, value: 'Сначала дорогие' },
];

export const FILTER_TITLES: Record<string, string> = {
  price: 'Цена',
  brand: 'Бренд',
  country: 'Страна производства',
  dossage: 'Дозировка',
  expirationDate: 'Срок годности',
  isByPrescription: 'Рецептурный отпуск',
  manufacturer: 'Производитель',
  quantityPerPackage: 'Количество в упаковке',
  releaseForm: 'Форма выпуска',
  storageTemperature: 'Температура хранения',
};
