import React, { useEffect } from "react";

type TodoData = {
    id: number;
    content: string;
    isEdit: boolean;
}

type Props = {
    data: TodoData;
    handleDelete: (id:number) => void;
}

// 컴포넌트를 React.memo로 감쌀 경우,
// props의 내용이 변하지 않는 한 해당 컴포넌트를 재렌더링 하지 않음.
// 만약 props가 이전과 다르지 않은데 재렌더링 하면 자원 낭비임.
// 따라서 여러 데이터를 props로 받아서 한 번에 보여줘야 하는 컴포넌트에 React.memo를 사용하면 매~우 좋음.
export default React.memo(function Item({ data, handleDelete }:Props) {

    return (
        <div className="w-full h-10 flex justify-between items-center border rounded-md p-2 my-2 shadow-sm">
            <p className="text-gray-600 text-sm h-[20px] w-9/12 overflow-hidden">{data.content}</p>
            <div>
                <button className="text-gray-400 text-sm mx-1 hover:opacity-70">수정</button>
                <button className="text-gray-400 text-sm mx-1 hover:opacity-70" onClick={() => { handleDelete(data.id) }}>삭제</button>
            </div>
        </div>
    )
})