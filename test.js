let items = [];

const list = document.querySelector("#List")
const input = document.querySelector("#TaskInput")
const button = document.querySelector("#AddTaskButton")

function render() {
    list.innerHTML = '';

    items.forEach(function (item, index) {
        const li = document.createElement('li');
        li.style.cursor = 'pointer';
        li.textContent = item.text;
        if (item.done) {
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.5';
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', function() {
            items = items.filter(function(t, i){
                return i !== index;
            });
            render();
        });
        list.appendChild(li);
    
         li.addEventListener('click', function() {
            items = items.map(function (item, i) {
                if (i === index) {
                    return {...item, done: !item.done };
                }
                return item;
            });
            render();
        });
    });
};

input.addEventListener('keypress', function (event) {
    if(event.key === 'Enter') {
        button.click();
    }
});

button.addEventListener('click', function () {
    const newTask = { text: input.value };
    items.push(newTask);
    input.value = '';
    console.log('ปุ่มถูกกด')
    render();
})



render();