const { validateTodoTitle, countActiveTodos, filterTodos } = require('./todoValidator');

/**
 * Створює нове завдання, інтегруючи модуль валідації з поточним списком.
 */
function addTodoItem(todos, rawTitle) {
    const validation = validateTodoTitle(rawTitle);
    if (!validation.valid) {
        throw new Error(validation.error);
    }
    const newItem = {
        id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
        title: validation.normalizedTitle,
        completed: false
    };
    const updatedTodos = [...todos, newItem];
    return {
        todos: updatedTodos,
        activeCount: countActiveTodos(updatedTodos)
    };
}

/**
 * Перемикає статус виконання завдання та повертає відфільтрований список і лічильник.
 */
function toggleAndFilterTodos(todos, id, currentFilter = 'all') {
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    return {
        visibleTodos: filterTodos(updatedTodos, currentFilter),
        activeCount: countActiveTodos(updatedTodos)
    };
}

module.exports = {
    addTodoItem,
    toggleAndFilterTodos
};
