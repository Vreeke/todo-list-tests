const {
    validateTodoTitle,
    countActiveTodos,
    filterTodos
} = require('../src/todoValidator');

describe('Unit tests: TodoMVC validator & helpers', () => {
    // Модульний тест 1
    test('Unit 1: Валідація та обрізання пробілів у назві завдання', () => {
        expect(validateTodoTitle('  Купити молоко  ')).toEqual({
            valid: true,
            normalizedTitle: 'Купити молоко'
        });
        expect(validateTodoTitle('     ')).toEqual({
            valid: false,
            normalizedTitle: '',
            error: 'Title cannot be empty'
        });
    });

    // Модульний тест 2
    test('Unit 2: Підрахунок невиконаних завдань (items left)', () => {
        const sampleTodos = [
            { id: 1, title: 'Завдання 1', completed: false },
            { id: 2, title: 'Завдання 2', completed: true },
            { id: 3, title: 'Завдання 3', completed: false }
        ];
        expect(countActiveTodos(sampleTodos)).toBe(2);
        expect(countActiveTodos([])).toBe(0);
    });

    // Модульний тест 3
    test('Unit 3: Фільтрація списку завдань за категоріями Active та Completed', () => {
        const sampleTodos = [
            { id: 1, title: 'Активне завдання', completed: false },
            { id: 2, title: 'Завершене завдання', completed: true }
        ];
        const activeOnly = filterTodos(sampleTodos, 'active');
        const completedOnly = filterTodos(sampleTodos, 'completed');

        expect(activeOnly).toHaveLength(1);
        expect(activeOnly[0].title).toBe('Активне завдання');
        expect(completedOnly).toHaveLength(1);
        expect(completedOnly[0].title).toBe('Завершене завдання');
    });
});
