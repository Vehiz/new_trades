export const validateDeposit = ({ amount, method, image }) => {
  const errors = {};
  const numericAmount = parseFloat(amount);

  if (!method) {
    errors.method = "Select a payment method.";
  }

  if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
    errors.amount = "Enter a valid deposit amount.";
  }

  if (!image) {
    errors.image = "Upload a payment slip.";
  }

  return errors;
};

export const validateWithdrawal = ({ amount, walletAddress, availableBalance }) => {
  const errors = {};
  const numericAmount = parseFloat(amount);
  const numericBalance = parseFloat(availableBalance);

  if (!walletAddress || walletAddress.trim().length < 10) {
    errors.walletAddress = "Enter a valid wallet address.";
  }

  if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
    errors.amount = "Enter a valid withdrawal amount.";
  } else if (!Number.isNaN(numericBalance) && numericAmount > numericBalance) {
    errors.amount = "Amount exceeds available balance.";
  }

  return errors;
};
