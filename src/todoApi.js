const axios = require('axios');
const { validateTodoTitle } = require('./todoValidator');

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

/**
 * Відправляє нове завдання на сервер після попередньої валідації.
 */
async function syncNewTodoToServer(rawTitle) {
    const validation = validateTodoTitle(rawTitle);
    if (!validation.valid) {
        throw new Error(validation.error);
    }
    const response = await axios.post(API_URL, {
        title: validation.normalizedTitle,
        completed: false,
        userId: 1
    });
    return response.data;
}

module.exports = {
    syncNewTodoToServer
};
