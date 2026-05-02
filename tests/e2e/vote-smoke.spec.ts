import { expect, test } from "@playwright/test";

test("vote page smoke renders core sections", async ({ page }) => {
  await page.goto("/vote");

  await expect(page.getByText("100% Anonymous")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Other Trending Leaders" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore Leaders" })).toBeVisible();
});
