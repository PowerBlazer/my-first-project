class Task {
    constructor(id, description, status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }

    toString() {
        return `Task ${this.id}: ${this.description} (${this.status})`;
    }
}

export default Task;