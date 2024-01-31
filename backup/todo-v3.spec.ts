import { Locator, Page, expect, test as base } from "@playwright/test";

const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
});

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = ["buy some cheese", "feed the cat"];

test("adding todo items", async ({ todoPage }) => {
  await test.step("first todo", async () => {
    await todoPage.addItem(TODO_ITEMS[0]);

    await expect(todoPage.items).toHaveText([TODO_ITEMS[0]]);
  });

  await test.step("second todo", async () => {
    await todoPage.addItem(TODO_ITEMS[1]);

    await expect(todoPage.items).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
  });
});

test("editing todo item", async ({ todoPage }) => {
  await todoPage.addItem(TODO_ITEMS[0]);

  const firstTodo = todoPage.items.nth(0);

  await firstTodo.dblclick();

  const firstTodoForm = firstTodo.getByRole("textbox", { name: "Edit" });

  await expect(firstTodoForm).toHaveValue(TODO_ITEMS[0]);

  await firstTodoForm.fill("buy some sausages");
  await firstTodoForm.press("Enter");

  await expect(todoPage.items).toHaveText(["buy some sausages"]);
});

class TodoPage {
  readonly newTodo: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.newTodo = page.getByPlaceholder("What needs to be done?");
    this.items = page.getByTestId("todo-item");
  }

  async addItem(item: string) {
    await this.newTodo.fill(item);
    await this.newTodo.press("Enter");
  }
}
