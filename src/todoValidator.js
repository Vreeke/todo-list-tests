/**
 * Нормалізує та перевіряє назву завдання.
 * @param {string} title
 * @returns {{ valid: boolean, normalizedTitle: string, error?: string }}
 */
function validateTodoTitle(title) {
    if (typeof title !== 'string') {
        return { valid: false, normalizedTitle: '', error: 'Title must be a string' };
    }
    const normalizedTitle = title.trim();
    if (normalizedTitle.length === 0) {
        return { valid: false, normalizedTitle: '', error: 'Title cannot be empty' };
    }
    if (normalizedTitle.length > 200) {
        return { valid: false, normalizedTitle, error: 'Title exceeds 200 characters' };
    }
    return { valid: true, normalizedTitle };
}

/**
 * Підраховує кількість невиконаних (активних) завдань.
 * @param {Array<{ id: number, title: string, completed: boolean }>} todos
 * @returns {number}
 */
function countActiveTodos(todos) {
    return todos.filter((todo) => !todo.completed).length;
}

/**
 * Фільтрує список завдань за статусом ('all' | 'active' | 'completed').
 * @param {Array<{ id: number, title: string, completed: boolean }>} todos
 * @param {string} filter
 */
function filterTodos(todos, filter = 'all') {
    if (filter === 'active') {
        return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
        return todos.filter((todo) => todo.completed);
    }
    return todos;
}

module.exports = {
    validateTodoTitle,
    countActiveTodos,
    filterTodos
};
