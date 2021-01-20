export default class Format {
  public static currencyBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  }

  public static currencyToDB(value: string): number {
    let newValue: string | number = '';
    newValue = value.replace('R$', '').trim();
    newValue = newValue.split('.').join('');
    newValue = Number(newValue.replace(',', '.'));
    newValue = new Intl.NumberFormat('en-US', {
      useGrouping: false,
    }).format(newValue);
    return Number(newValue);
  }

  public static dbToCurrency(value: string): string {
    const newValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(Number(value));

    return newValue.substr(2);
  }
}
