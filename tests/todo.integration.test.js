const axios = require('axios');
const { addTodoItem, toggleAndFilterTodos } = require('../src/todoService');
const { syncNewTodoToServer } = require('../src/todoApi');

jest.mock('axios');

describe('Integration tests: TodoMVC service & API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Інтеграційний тест 1 (взаємодія todoService + todoValidator)
    test('Integration 1: Додавання, зміна статусу та фільтрація завдань у сервісі', () => {
        const initialList = [{ id: 1, title: 'Підготувати звіт', completed: false }];

        const afterAdd = addTodoItem(initialList, '  Захистити ЛР №5  ');
        expect(afterAdd.todos).toHaveLength(2);
        expect(afterAdd.todos[1].title).toBe('Захистити ЛР №5');
        expect(afterAdd.activeCount).toBe(2);

        const afterToggle = toggleAndFilterTodos(afterAdd.todos, 1, 'active');
        expect(afterToggle.activeCount).toBe(1);
        expect(afterToggle.visibleTodos).toHaveLength(1);
        expect(afterToggle.visibleTodos[0].id).toBe(2);
    });

    // Інтеграційний тест 2 (взаємодія todoApi + todoValidator + axios mock)
    test('Integration 2: Валідація та синхронізація нового завдання із сервером (mock axios)', async () => {
        axios.post.mockResolvedValue({
            data: {
                id: 201,
                title: 'Здати лабораторну роботу',
                completed: false,
                userId: 1
            }
        });

        const created = await syncNewTodoToServer('  Здати лабораторну роботу  ');

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/todos',
            {
                title: 'Здати лабораторну роботу',
                completed: false,
                userId: 1
            }
        );
        expect(created.id).toBe(201);
        expect(created.title).toBe('Здати лабораторну роботу');
    });
});
