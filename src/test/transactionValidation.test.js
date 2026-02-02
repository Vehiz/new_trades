import { describe, expect, it } from "vitest";
import { validateDeposit, validateWithdrawal } from "../validation/transactionValidation";

describe("transactionValidation", () => {
  it("validates deposit inputs", () => {
    const errors = validateDeposit({ amount: "", method: "", image: null });
    expect(errors.amount).toBeDefined();
    expect(errors.method).toBeDefined();
    expect(errors.image).toBeDefined();
  });

  it("accepts valid deposit inputs", () => {
    const errors = validateDeposit({ amount: "100", method: "Bitcoin", image: {} });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("validates withdrawal inputs", () => {
    const errors = validateWithdrawal({ amount: "-5", walletAddress: "", availableBalance: 10 });
    expect(errors.amount).toBeDefined();
    expect(errors.walletAddress).toBeDefined();
  });

  it("blocks withdrawal above balance", () => {
    const errors = validateWithdrawal({ amount: "50", walletAddress: "valid-wallet-address", availableBalance: 10 });
    expect(errors.amount).toBeDefined();
  });

  it("accepts valid withdrawal inputs", () => {
    const errors = validateWithdrawal({ amount: "5", walletAddress: "valid-wallet-address", availableBalance: 10 });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
