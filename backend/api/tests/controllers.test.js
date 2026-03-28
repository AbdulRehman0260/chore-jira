import { describe, it, expect, vi, beforeEach } from "vitest";
import { createUser, userLogin } from "../controllers/userControllers.js";

// Mock the mongoose model before importing
vi.mock("../../db/models/userModel.js", () => {
  const MockCustomer = vi.fn(function (data) {
    this.data = data;
    this.save = vi.fn().mockResolvedValue(true);
  });
  return { Customer: MockCustomer };
});

import { Customer } from "../../db/models/userModel.js";

// Helper to create mock req/res objects
const createMockRes = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
  cookie: vi.fn().mockReturnThis(),
});

const createMockReq = (body = {}) => ({ body });

describe("createUser controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a user and return 201", async () => {
    const mockReq = createMockReq({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const mockRes = createMockRes();

    // Mock Customer to have save resolve
    Customer.mockImplementation(function (data) {
      this.data = data;
      this.save = vi.fn().mockResolvedValue(true);
    });

    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalled();
  });

  it("should return 500 when save fails", async () => {
    const mockReq = createMockReq({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const mockRes = createMockRes();

    // Mock Customer to have save reject
    Customer.mockImplementation(function (data) {
      this.data = data;
      this.save = vi.fn().mockRejectedValue(new Error("Database error"));
    });

    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
