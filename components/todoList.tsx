import Item from "./item";
import Form from "./form";
import React, { useEffect, useCallback, useState } from 'react';

type TodoData = {
    id: number;
    content: string;
    isEdit: boolean;
}
// todoData의 타입을 지정해줌.

export default React.memo(function TodoList() {
    const [todoData, setTodoData] = useState<TodoData[]>([]);
    const [value, setValue] = useState<string>("");

    // todoList 컴포넌트가 렌더링 될 때
    // localStorage에서 "todoData"키의 데이터들을 한 번 불러와서 todoData 배열에 저장함.
    useEffect(() => {
        setTodoData(JSON.parse(localStorage.getItem("todoData") ?? "[]"));
        // Typescript 에서는 타입을 업격하게 처리함.
        // ?? 연산자는 예를 들어,
        // A ?? B 일 때, A가 null 이거나 undefined 이면 B로 하라.
        // 라는 의미이다. 따라서 localStorage에 아무 데이터도 들어있지 않으면 빈 배열을 반환.

    }, []);

    // todoData가 변경될 때 마다
    // localStorage에도 변경된 내용을 반영해줌.
    useEffect(() => {
        if (todoData.length) {
            localStorage.setItem("todoData", JSON.stringify(todoData));
        }
    }, [todoData]);

    // todoData에 새로운 요소를 추가해줌
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
        // form 태그에서 submit 이벤트가 발생했을 때
        // 함수로 넘겨주는 이벤트의 타입은 'React.FormEvent<HTMLFormElement'임.

        e.preventDefault();
        // 새로고침 방지

        if (value !== "") {
            let newTodo = {
                id: Date.now(),
                content: value,
                isEdit: false
            }
        
            setTodoData((prev:TodoData[]):TodoData[] => [...prev, newTodo]);
            // spread 연산자를 이용해 기존에 있던 데이터들에 새로운 데이터를 추가해준 형태로 todoData를 저장해줌.

            setValue("");
        }
    };
    
    // todoData에서 요소를 삭제해줌
    // 위에서 선언한 handleSubmit 함수의 경우 컴포넌트가 렌더링 될 때마다 함수가 새로 선언됨.
    // 자원을 아끼기 위해 함수를 재사용 하는 것은 매우 중요.
    // useCallback은 함수가 새로 선언되지 않고 재사용 되도록 해줄 수 있음.
    // 주의 : 함수 내에서 사용하는 상태, props가 있다면 해당 변수들을 두 번째 인자의 배열에 넣어주여야 함.
    // 그렇지 않으면 함수 내에서 사용되는 값들이 최신의 값이라고 보장할 수 없음.
    const handleDelete = useCallback((id:number) => {
        // 삭제할 요소의 id값을 받음
        let newTodoData = todoData.filter(data => data.id !== id);
        // filter 함수를 통해 받은 id값과 id값이 다른 요소들만 뽑아서 newTodoData 변수에 넣어줌.
        setTodoData(newTodoData);
    }, [todoData]);

    return (
        <div className="shadow-lg rounded-lg w-96 h-fit p-5 bg-white">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Todo-List</h1>
            </div>
            <div>
                {
                    todoData.map((el, index) => (
                        // map 함수를 통해 배열의 내부 요소들을 하나씩 거쳐감.
                        <Item key={index} data={el} handleDelete={handleDelete} />
                    ))
                }
            </div>
            <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
        </div>
    )
})