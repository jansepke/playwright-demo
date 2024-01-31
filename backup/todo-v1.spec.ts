import { expect, test } from "@playwright/test";

// async await
test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = ["buy some cheese", "feed the cat"];

// fullyParallel
// page
test("adding todo items", async ({ page }) => {
  // lazy evalutation
  // testing library style / web first assertions
  const newTodo = page.getByPlaceholder("What needs to be done?");

  // step
  await test.step("first todo", async () => {
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // jest expect
    await expect(page.getByTestId("todo-item")).toHaveText([TODO_ITEMS[0]]);
  });

  await test.step("second todo", async () => {
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // target multiple elements
    await expect(page.getByTestId("todo-item")).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
  });
});

test("editing todo item", async ({ page }) => {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  await newTodo.fill(TODO_ITEMS[0]);
  await newTodo.press("Enter");

  const todoItems = page.getByTestId("todo-item");
  // chaining
  const firstTodo = todoItems.nth(0);

  await firstTodo.dblclick();

  // chaining
  const firstTodoForm = firstTodo.getByRole("textbox", { name: "Edit" });

  await expect(firstTodoForm).toHaveValue(TODO_ITEMS[0]);

  await firstTodoForm.fill("buy some sausages");
  await firstTodoForm.press("Enter");

  await expect(todoItems).toHaveText(["buy some sausages"]);
});

// errors + trace
// multiple projects
