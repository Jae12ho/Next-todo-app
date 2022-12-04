import Item from "./item";
import Form from "./form";
import React, { useEffect, useCallback, useState } from 'react';

type TodoData = {
    id: number;
    content: string;
}
// todoData의 타입을 지정해줌.

export default function TodoList() {
    const [todoData, setTodoData] = useState<TodoData[]>([]);
    const [value, setValue] = useState<string>("");
    const [isInit, setIsInit] = useState(false);

    // todoData가 변경될 때 마다
    // localStorage에도 변경된 내용을 반영해줌.
    useEffect(() => {
        if (!isInit) {
            setTodoData(JSON.parse(localStorage.getItem("todoData") ?? "[]"));
            // Typescript 에서는 타입을 업격하게 처리함.
            // ?? 연산자는 예를 들어,
            // A ?? B 일 때, A가 null 이거나 undefined 이면 B로 하라.
            // 라는 의미이다. 따라서 localStorage에 아무 데이터도 들어있지 않으면 빈 배열을 반환.
            
            setIsInit(true);
        } else {
            localStorage.setItem("todoData", JSON.stringify(todoData));
        }
    }, [todoData, isInit]);

    return (
        <div className="shadow-lg rounded-lg w-96 h-fit p-5 bg-white">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Todo-List</h1>
            </div>
            <div>
                {
                    todoData.map((el, index) => (
                        // map 함수를 통해 배열의 내부 요소들을 하나씩 거쳐감.
                        <Item key={index} data={el} todoData={todoData} setTodoData={setTodoData} />
                    ))
                }
            </div>
            <Form value={value} setValue={setValue} setTodoData={setTodoData} />
        </div>
    )
}