const STORAGE_KEY = 'todo-items';

let items = load();

const list = document.querySelector("#List")
const input = document.querySelector("#TaskInput")
const button = document.querySelector("#AddTaskButton")

// อ่านข้อมูลจาก localStorage ตอนเปิดหน้า
// - localStorage เก็บได้แค่ string เลยต้อง parse กลับเป็น array/object ด้วย JSON.parse
// - ถ้ายังไม่เคยเก็บอะไรเลย (ผู้ใช้ใหม่) getItem จะได้ null -> คืน [] แทน
// - task เก่าที่สร้างก่อนมี mark-as-done จะไม่มี field `done` -> normalize ให้มีเสมอ (?? false)
function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map(function (item) {
        return { text: item.text, done: item.done ?? false };
    });
}

// บันทึกสถานะปัจจุบันของ items กลับลง localStorage
// - JSON.stringify แปลง array ของ object ให้เป็น string ก่อนเก็บ (บังคับของ localStorage)
function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function render() {
    list.innerHTML = '';

    if (items.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty-state';
        empty.textContent = 'ยังไม่มีงาน — เพิ่มรายการแรกได้เลย';
        list.appendChild(empty);
        return;
    }

    items.forEach(function (item, index) {
        const li = document.createElement('li');
        li.className = 'task-item' + (item.done ? ' done' : '');

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = item.text;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
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
