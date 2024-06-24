function nthFibonachi(n) {
  if (n <= 0) {
    return "n должно быть больше или равно 1";
  }

  if (n === 1) {
    return 0;
  }

  if (n === 2) {
    return 1;
  }

  let a = 0;
  let b = 1;
  let temp;

  for (let i = 3; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}
