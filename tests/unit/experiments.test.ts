import { describe, expect, it } from "vitest";
import {
  buildCookieString,
  ensureExperimentSessionKey,
  EXPERIMENTS,
  getExperimentCookieName,
  getExperimentVariant,
  readCookieValue,
} from "@/lib/experiments";

describe("lib/experiments", () => {
  it("returns deterministic variant for same session", () => {
    const experiment = EXPERIMENTS.voteCtaCopyV1;
    const first = getExperimentVariant(experiment, "session-1");
    const second = getExperimentVariant(experiment, "session-1");
    expect(first).toBe(second);
  });

  it("reads cookie values by key", () => {
    const value = readCookieValue("foo=bar; lv_exp_vote_cta_copy_v1=control", "lv_exp_vote_cta_copy_v1");
    expect(value).toBe("control");
  });

  it("creates experiment and session cookies", () => {
    const cookie = buildCookieString(getExperimentCookieName("vote_cta_copy_v1"), "control", 120);
    expect(cookie).toContain("lv_exp_vote_cta_copy_v1=control");
    expect(cookie).toContain("Max-Age=120");
  });

  it("reuses existing experiment session key from cookies", () => {
    const session = ensureExperimentSessionKey("lv_exp_session=my-session; foo=bar");
    expect(session).toEqual({ key: "my-session", shouldPersist: false });
  });
});
