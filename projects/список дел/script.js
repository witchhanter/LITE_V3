document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
  
    // Функция для создания новой задачи
    function createTask(taskText) {
      const li = document.createElement('li');
      li.classList.add('task');
      
      li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span>${taskText}</span>
        <button class="delete-btn">Удалить</button>
      `;
      
      const checkbox = li.querySelector('.task-checkbox');
      const deleteButton = li.querySelector('.delete-btn');
      
      // Слушатель для удаления задачи
      deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
      });
      
      // Слушатель для отметки задачи как выполненной
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          li.classList.add('completed');
        } else {
          li.classList.remove('completed');
        }
      });
      
      taskList.appendChild(li);
    }
  
    // Обработчик для добавления задачи
    addButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      
      if (taskText === '') {
        alert('Пожалуйста, введите задачу!');
        return;
      }
      
      createTask(taskText);
      taskInput.value = '';  // Очищаем поле ввода
    });
  
    // Добавление задачи по нажатию клавиши Enter
    taskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        addButton.click();
      }
    });
  });
  