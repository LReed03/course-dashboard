import { apiFetch } from "./AuthAPI";
const APIURL = `${process.env.REACT_APP_API_URL}/courses`

export async function loadCourses(){
    try{
        let data = await apiFetch(APIURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        return data || [];
    }
    catch (error){
        console.error("Error loading tasks:", error);
        return [];
    }
    
}

export async function addCourse(course){
    try{
        return await apiFetch(APIURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        });
    }
    catch (error) {
        console.error("Error adding task:", error);
    }
}

export async function deleteCourse(course) {;
    try{
        return await apiFetch(APIURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        });
    }
    catch (error) {
        console.error("Error loading tasks:", error);
    }
}

export async function editCourse(course){
    try{
        await apiFetch(`${APIURL}/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course)
    });
    }
    catch(error){
        console.error("Error loading tasks:", error)
    }
    }
    