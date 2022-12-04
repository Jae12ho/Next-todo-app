import Link from "next/link";
import React, { useState, Dispatch, SetStateAction, useCallback, useEffect } from "react";

type TodoData = {
    id: number;
    content: string;
}

type Props = {
    data: TodoData;
    todoData: TodoData[];
    setTodoData: Dispatch<SetStateAction<TodoData[]>>;
}

// 컴포넌트를 React.memo로 감쌀 경우,
// props의 내용이 변하지 않는 한 해당 컴포넌트를 재렌더링 하지 않음.
// 만약 props가 이전과 다르지 않은데 재렌더링 하면 자원 낭비임.
// 따라서 여러 데이터를 props로 받아서 한 번에 보여줘야 하는 컴포넌트에 React.memo를 사용하면 매~우 좋음.
export default React.memo(function Item({ data, todoData, setTodoData }:Props) {
    const [isEdit, setIsEdit] = useState(false);
    const [editValue, setEditValue] = useState(data.content);

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
    }, [todoData, setTodoData]);

    const activeEdit = useCallback(() => {
        setIsEdit(true);
        setEditValue(data.content);
    }, []);

    const handleEditSubmit = useCallback((e?:React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        // 새로고침 방지
        let newTodoData = todoData.map(el => {
            if (el.id === data.id) {
              el.content = editValue;
            }
            return el;
        });

        setTodoData(newTodoData);
        setIsEdit(false);
    }, [todoData, setTodoData, data.id, editValue]);

    const handleEditChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    }, []);
    
    return (
        <div className="w-full h-10 flex justify-between items-center border rounded-md p-2 my-2 shadow-sm">
            {
                !isEdit && (
                    <Link href={"/" + data.id} className="text-gray-600 text-sm h-[20px] w-9/12">
                        <p className="text-gray-600 text-sm h-[20px] w-9/12 overflow-hidden">{data.content}</p>
                    </Link>
                )
            }
            {
                isEdit && (
                    <form className="w-9/12" onSubmit={handleEditSubmit}>
                        <input className="w-full h-full focus:outline-none my-2 text-gray-600 text-sm" value={editValue} onChange={handleEditChange} autoFocus/>
                    </form>
                )
            }
            <div>
                <button className="text-gray-400 text-sm mx-1 hover:opacity-70" onClick={() => {isEdit ? handleEditSubmit() : activeEdit()}}>{isEdit ? "확인" : "수정"}</button>
                <button className="text-gray-400 text-sm mx-1 hover:opacity-70" onClick={() => { handleDelete(data.id) }}>삭제</button>
            </div>
        </div>
    )
})