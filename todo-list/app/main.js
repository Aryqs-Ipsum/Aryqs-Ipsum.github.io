// storage init
if(!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", "Example of task, check me !§false")
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function navigation() {
    return {
        open: false,
        downloadData() {
            text = localStorage.getItem('tasks')
            text = text.replace(/\|/g, '\n')
            text = text.replace(/§/g, ',')
            download("tasklist.csv", text);
        },
        deleteData() {
            localStorage.removeItem("tasks")
        },
        importData() {

        }
    }
}

function taskList() {
    return {
        // vars
        taskString: "",
        tasks: localStorage.getItem('tasks').split('|'),
        addTask() {
            this.tasks.unshift(this.taskString + '§false')
            this.save()
            this.taskString = ""
            setTimeout(function() {
                checkbox_list = document.querySelectorAll('.mdl-checkbox__ripple-container, .mdl-checkbox')
                checkbox_list.forEach(function(item) {
                    item.removeAttribute('data-upgraded')
                });
                componentHandler.upgradeDom();
            }, 250)
        },
        deleteTask(task) {
            const index = this.tasks.indexOf(task)
            if(index > -1) {
                this.tasks.splice(index, 1);
                this.save()
            }
        },
        textTask(array) {
            array.split('§')[0]
        },
        checkTask(array) {
            state = array.split('§')[1]
            index = this.tasks.indexOf(array)
            this.tasks[index] = array.split('§')[0] + '§' + (state == 'true' ? 'false' : 'true')
            this.save()
        },
        arrayCount() {
            return this.tasks.length
        },
        completedCount() {
            completed = 0
            for(index in this.tasks) {
                value = this.tasks[index].split('§')[1]
                if(value == 'true') {
                    completed++
                }
            }
            return completed
        },
        completedPercents() {
            return 'width: ' + this.completedCount() / this.arrayCount() * 100 + '%'
        },
        save() {
            localStorage.setItem("tasks", this.tasks.join('|'))
        }
    };
}