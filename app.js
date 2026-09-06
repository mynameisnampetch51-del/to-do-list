const STORAGE_KEY = 'todo-items';

let items = load();

const list = document.querySelector("#List")
const input = document.querySelector("#TaskInput")
const button = document.querySelector("#AddTaskButton")


function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map(function (item) {
        return { text: item.text, done: item.done ?? false };
    });
}


function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function render() {
    list.innerHTML = '';

    if (items.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'text-center text-sm text-ink-muted py-5';
        empty.textContent = 'ยังไม่มีงาน — เพิ่มรายการแรกได้เลย';
        list.appendChild(empty);
        return;
    }

    items.forEach(function (item, index) {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-line bg-surface-2 cursor-pointer';

        const span = document.createElement('span');
        span.className = 'break-words' + (item.done ? ' line-through opacity-50' : '');
        span.textContent = item.text;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'flex-shrink-0 px-2.5 py-1 text-xs rounded-md border border-line-strong text-ink-muted bg-bg hover:border-accent-strong hover:text-accent-strong';
        deleteBtn.type = 'button';
        deleteBtn.textContent = 'ลบ';
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // กันไม่ให้ click ปุ่มลบไป trigger click ของ li (toggle done) ด้วย
            items = items.filter(function (t, i) {
                return i !== index;
            });
            save();
            render();
        });

        li.addEventListener('click', function () {
            items = items.map(function (item, i) {
                if (i === index) {
                    return { ...item, done: !item.done };
                }
                return item;
            });
            save();
            render();
        });

        list.appendChild(li);
    });
}

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        button.click();
    }
});

button.addEventListener('click', function () {
    const text = input.value.trim();
    if (!text) return;
    items.push({ text: text, done: false });
    input.value = '';
    save();
    render();
})

render();
