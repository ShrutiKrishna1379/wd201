const todoList = require("../todo");

const {all, markAsComplete, add, overdue, dueToday, dueLater} = todoList();
describe("TodoList Test Suite", () => {
  
  beforeAll(() => {
    add(
      {
        title: "Test todo",
        completed: false,
        dueDate: new Date().toISOString().slice(0, 10),
      }
    );
  })

  test("Should Add new Todo", () => {
    const todoItemsCount = all.length;
    add(
      {
        title: "Test todo",
        completed: false,
        dueDate: new Date().toISOString().slice(0, 10),
      }
    );
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieval overdue items", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 
    add({
      title: "Overdue_Task",
      completed: false,
      dueDate: yesterday.toISOString().slice(0, 10),
    });

    const overdues = overdue();
    expect(overdues.length).toBe(1); 
  });

  test("Should retrieval due today items", () => {
    const today = new Date().toISOString().slice(0, 10);
    add({
      title: "DueToday_Task",
      completed: false,
      dueDate: today,
    });

    const itemsDueToday = dueToday();
    expect(itemsDueToday.length).toBe(3); 
  });

  test("Should retrieval due later items", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    add({
      title: "DueLater_Task",
      completed: false,
      dueDate: tomorrow.toISOString().slice(0, 10),
    });

    const itemsDueLater = dueLater();
    expect(itemsDueLater.length).toBe(1); 
  });
});