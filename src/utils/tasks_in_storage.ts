const tasks_in_storage = typeof window !== 'undefined' ? localStorage.getItem("tasks") : null;

export {tasks_in_storage}