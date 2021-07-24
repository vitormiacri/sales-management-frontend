export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const cnpjMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const cpfCnpjMask = (value: string): string => {
  if (value.length <= 14) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})/, '$1');
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const cepMask = (value: string): string => {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d{1,2})/, '$1-$2');
};

export const dataMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2,3,4})/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1');
};

export const moedaMask = (value: string): string => {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{1})(\d{14})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{11})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{8})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{5})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{1,2})$/, '$1,$2');
  return value;
};

export const telefoneMask = (value: string): string => {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d\d)(\d)/g, '($1) $2');
  if (value.length === 14) {
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
  } else {
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  }
  return value;
};

export const numberMask = (value: string): string => {
  return value.replace(/\D/g, '');
};
