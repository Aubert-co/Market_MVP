import { userSessionMiddleware } from "@/middleware/userSession.middeware"


import { randomUUID } from "crypto";

jest.mock("crypto", () => ({
  randomUUID: jest.fn()
}));

describe("userSessionMiddleware", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      cookies: {}
    };

    res = {
      cookie: jest.fn()
    };

    next = jest.fn();
  });

  it("should create a sessionId when it does not exist", () => {
    (randomUUID as jest.Mock).mockReturnValue("mock-session-id");

    userSessionMiddleware(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith(
      "sessionId",
      "mock-session-id",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/"
      })
    );

    expect(req.sessionId).toBe("mock-session-id");
    expect(next).toHaveBeenCalled();
  });

  it("should not create a new sessionId when it already exists", () => {
    req.cookies.sessionId = "existing-session-id";

    userSessionMiddleware(req, res, next);

    expect(res.cookie).not.toHaveBeenCalled();
    expect(req.sessionId).toBe("existing-session-id");
    expect(next).toHaveBeenCalled();
  });

  it("should always call next", () => {
    userSessionMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should set secure cookie when in production", () => {
    process.env.NODE_ENV = "production";
    (randomUUID as jest.Mock).mockReturnValue("prod-session-id");

    userSessionMiddleware(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith(
      "sessionId",
      "prod-session-id",
      expect.objectContaining({
        secure: true
      })
    );
  });
});