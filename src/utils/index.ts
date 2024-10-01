// format number or string to US dollar
const USDollar = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  useGrouping: true,
});

export const currencyFormat = (dollars: number | string) => {
  return USDollar.format(Number(dollars));
};

// export const SERVER_URI = 'https://a38c.com:8443/eazybank-0.0.1';
export const SERVER_URI = 'http://localhost:8080';
