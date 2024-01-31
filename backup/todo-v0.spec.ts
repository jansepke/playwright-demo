import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = ["buy some cheese", "feed the cat"];

test("adding todo items", async ({ page }) => {});

test("editing todo item", async ({ page }) => {});
