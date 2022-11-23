export default function Item() {
    return (
        <div className="h-10 flex justify-between items-center border rounded-md p-2 my-2">
            <p>Item</p>
            <div>
                <button className="text-gray-400 text-sm mx-1">수정</button>
                <button className="text-gray-400 text-sm mx-1">삭제</button>
            </div>
        </div>
    )
}