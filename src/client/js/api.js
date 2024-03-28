async function getTasksList(){
    try {
        const response = await fetch('/tasks',{
            method:"GET"
        });

        if(!response.ok){
            return {
                isSuccess: false,
                error: await response.json()
            }
        }

        return {
            isSuccess: true,
            result: await response.json()
        }

    } catch (error) {
        return {
            isSuccess: false,
            error: error
        }
    }
}


async function createTask(task){
    try {
        const response = await fetch('/tasks',{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(task)
        })

        if(!response.ok){
            return {
                isSuccess: false,
                error: await response.json()
            }
        }

        return {
            isSuccess: true,
            result: await response.json()
        }
        
    } catch (error) {
        return {
            isSuccess: false,
            error: error
        }
    }
}


async function deleteTask(taskId){
    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method:'DELETE',
        })

        if(!response.ok){
            return {
                isSuccess: false,
                error: await response.json()
            }
        }

        return {
            isSuccess: true,
        }

    } catch (error) {
        return {
            isSuccess: false,
            error: error
        }
    }
}


export {
    getTasksList,
    createTask,
    deleteTask
}