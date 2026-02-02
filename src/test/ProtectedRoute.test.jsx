import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectRoute";

let mockUser = null;

vi.mock("../components/useAuth", () => ({
  useAuth: () => ({ currentUser: mockUser }),
}));

vi.mock("../components/Account", () => ({
  default: () => <div data-testid="account-page">Account</div>,
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockUser = null;
  });

  it("renders account when authenticated", () => {
    mockUser = { uid: "user-1" };
    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );

    expect(screen.getByTestId("account-page")).toBeInTheDocument();
  });

  it("redirects when unauthenticated", () => {
    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("account-page")).not.toBeInTheDocument();
  });
});
