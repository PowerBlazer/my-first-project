class Task {
    constructor(id, description, status, title) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.title = title
    }

    toString() {
        return `Task ${this.id}: ${this.description} (${this.status})`;
    }
}

export default Task;