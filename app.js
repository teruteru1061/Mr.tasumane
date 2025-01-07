document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskModal = document.getElementById("taskModal");
    const closeModal = document.getElementById("closeModal");
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const taskMessage = document.getElementById("taskMessage");
    const taskCount = document.getElementById("taskCount");

    function updateTaskSummary() {
        const taskNumber = taskList.children.length;
        taskCount.textContent = `現在のタスク数: ${taskNumber}`;

        if (taskNumber === 0) {
            taskMessage.textContent = "今日も素晴らしい！";
        } else if (taskNumber >= 1 && taskNumber <= 5) {
            taskMessage.textContent = "その調子！";
        } else if (taskNumber >= 6 && taskNumber <= 10) {
            taskMessage.textContent = "頑張れ！君ならできる！";
        } else {
            taskMessage.textContent = "千里の道も一歩から。まずは一つ！";
        }
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const dateA = new Date(a.dataset.deadline);
            const dateB = new Date(b.dataset.deadline);
            return dateA - dateB;
        });
        tasks.forEach(task => taskList.appendChild(task));
    }

    addTaskButton.addEventListener("click", () => {
        taskModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        taskModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === taskModal) {
            taskModal.style.display = "none";
        }
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const taskDeadline = document.getElementById("taskDeadline").value;
        const taskNotes = document.getElementById("taskNotes").value;

        const taskItem = document.createElement("li");
        taskItem.dataset.deadline = taskDeadline;

        const taskContent = document.createElement("div");
        taskContent.textContent = `${taskName} (締切: ${taskDeadline})`;

        const completeButton = document.createElement("button");
        completeButton.textContent = "完了";
        completeButton.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            updateTaskSummary();
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(completeButton);
        taskList.appendChild(taskItem);

        taskModal.style.display = "none";
        taskForm.reset();
        updateTaskSummary();
        sortTasks();
    });

    updateTaskSummary();
});
