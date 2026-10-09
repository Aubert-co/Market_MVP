import request from "supertest";
import app from "@/serve";
import { XForwardedForIncrease } from "@/tests/__utils__/rate_limit";

describe("getUserInformation rate limit", () => {
    it("should block requests after the rate limit is exceeded", async () => {
        const xForward = XForwardedForIncrease();
        const requests = Array.from({ length: 100 }).map(() =>
            request(app)
                .get("/api/auth/me")
                .set("X-Forwarded-For", xForward)
        );
        const responses = await Promise.all(requests);

        const blocked = responses.filter((response) => response.status === 429);
        expect(blocked).toHaveLength(0);

        const response = await request(app)
            .get("/api/auth/me")
            .set("X-Forwarded-For", xForward);

        expect(response.status).toBe(429);
        expect(response.body.message).toBe(
            "Too many requests from this IP, please try again later."
        );
    });
});
