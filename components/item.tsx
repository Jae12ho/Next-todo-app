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