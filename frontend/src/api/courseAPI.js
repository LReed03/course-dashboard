export async function loadCourses() {
    const backendEndpoint = "http://localhost:5000/courses";
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

export async function addCourse(course){
    const backendEndpoint = "http://localhost:5000/courses";
    try{
        const response = await fetch(backendEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        });
        return await response.json();
    }
    catch (error) {
        console.error("Error adding task:", error);
    }
}

export async function deleteCourse(course) {
    const backendEndpoint = "http://localhost:5000/courses";
    try{
        const response = await fetch(backendEndpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        });
        return await response.json();
    }
    catch (error) {
        console.error("Error loading tasks:", error);
    }
}

export async function editCourse(course){
    const backendEndpoint = `http://localhost:5000/courses/${course.id}`;
    await fetch(backendEndpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course)
  });
}