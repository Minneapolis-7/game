import ruText from '@/shared/lang/ru_RU.json';

// в тестовой среде (jest) `ruText` — объект, в prod/dev — строка
const text = typeof ruText === 'string' ? JSON.parse(ruText) : ruText;

export default text;
