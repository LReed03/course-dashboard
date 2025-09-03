import { apiFetch } from "./AuthAPI";
const APIURL = `${process.env.REACT_APP_API_URL}/tasks`

export async function addTask(task){
    try{
        return await apiFetch(APIURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
    }
    catch (error) {
        console.error("Error adding task:", error);
    }
}

export async function loadTasks() {
    try{
        const data = await apiFetch(APIURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data || [];
    }
    catch (error) {
        console.error("Error loading tasks:", error);
        return [];
    }
}

export async function editTask(task) {
    try{
        await apiFetch(`${APIURL}/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        });
    }
    catch (error) {
        console.error("Error editing task:", error);
    }
}


export async function deleteTask(task) {
    try{
        return await apiFetch(APIURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
    }
    catch (error) {
        console.error("Error loading tasks:", error);
    }
}
