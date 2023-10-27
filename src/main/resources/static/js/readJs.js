let todoNo;
// 개인 - 할일 보기
const selectOne = function (e) {
    e.stopPropagation();
    const target = e.target;
    if (target.tagName === 'A') {
        todoNo = target.getAttribute("data-todono");
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/private/privateTodoSelectOne/' + todoNo);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);

            const title = document.querySelector('#title');
            const description = document.querySelector('#description');
            const status = document.querySelector('#choices-privacy-status-input');

            title.value = result.title;
            description.value = result.description;
            status.value = result.status;
        }
    }
};

// 개인 - 할일 수정
const todoupdate = function () {
    const todono = todoNo
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const status = document.querySelector('#choices-privacy-status-input').value;

    const todoData = {
        todoNo : todono,
        title: title,
        description: description,
        status: status
    };
    const jsonData = JSON.stringify(todoData);

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/private/privateTodoUpdate/' + todoNo);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(jsonData);

    $('#todotaskModal').modal('hide');

    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            window.location.href = '/private/privatetodolist';
        }
    });
};

// 모달 열기와 닫기 이벤트 처리
const buttons = document.querySelectorAll('.dropdown-item[data-bs-toggle="modal"]');
buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        selectOne(e);
    });
});

document.querySelector('#todoUpdate').addEventListener('click', function () {
    if (todoNo) {
        todoupdate();
        $('#todotaskModal').modal('hide');
        window.location.href = '/private/privatetodolist';
    }
});

// 개인 - 할 일 삭제
const todoDelete = function (e) {
    e.stopPropagation();
    const target = e.target;
    if (target.tagName === 'A') {
        todoNo = target.getAttribute("data-todono");
    }
};
document.querySelector('#delete-record').addEventListener('click', function () {
    if (todoNo) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/private/privateDelete/' + todoNo);
        xhr.send();

        $('#deleteRecordModal').modal('hide');

        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                window.location.href = '/private/privatetodolist';
            }
        });
    }
});
document.querySelectorAll('.dropdown-item').forEach(function (button) {
    button.addEventListener('click', todoDelete);
});
