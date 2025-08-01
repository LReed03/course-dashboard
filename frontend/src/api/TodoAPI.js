export async function addTask(task){
    const backendEndpoint = "http://localhost:5000/tasks";
    try{
        const response = await fetch(backendEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        return await response.json();
    }
    catch (error) {
        console.error("Error adding task:", error);
    }
}

export async function loadTasks() {
    const backendEndpoint = "http://localhost:5000/tasks";
    try{
        const response = await fetch(backendEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data || [];
    }
    catch (error) {
        console.error("Error loading tasks:", error);
        return [];
    }
}

export async function editTask(task) {

}


export async function deleteTask(task) {
    const backendEndpoint = "http://localhost:5000/tasks";
    try{
        const response = await fetch(backendEndpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        return await response.json();
    }
    catch (error) {
        console.error("Error loading tasks:", error);
    }
}
