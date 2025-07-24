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
