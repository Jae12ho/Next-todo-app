import React, { Dispatch, SetStateAction } from 'react';

type TodoData = {
    id: number;
    content: string;
}
// todoData의 타입을 지정해줌.

type Props = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    setTodoData: Dispatch<SetStateAction<TodoData[]>>;
}
// props 의 타입을 지정해주었음.
// props를 받아올 때 props의 각 타입을 지정해주어야 함.
// 함수의 경우 인자값의 타입, 반환값의 타입을 모두 지정해주어야 함.

export default function form({ value, setValue, setTodoData }:Props) {
    // 입력된 값을 value변수에 실시간으로 갱신해주는 코드.
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        // onChange 이벤트가 발생했을 때 실행되는 함수는 
        // 'React.ChangeEvent<>' 타입을 가짐.
        setValue(e.target.value);
    }

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
            }
        
            setTodoData((prev:TodoData[]):TodoData[] => [...prev, newTodo]);
            // spread 연산자를 이용해 기존에 있던 데이터들에 새로운 데이터를 추가해준 형태로 todoData를 저장해줌.

            setValue("");
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="w-full h-10 flex justify-between items-center">
            <input type="text" name="value" className="w-full h-full focus:outline-none border rounded-md p-2 my-2 shadow-sm text-gray-600 text-sm" placeholder="할 일을 입력하세요." value={value} onChange={handleChange} />
            <button className="ml-2 p-2 rounded-md bg-blue-300 text-white font-bold hover:opacity-70">ADD</button>
        </form>
    )
}