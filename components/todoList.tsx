import Container from "./container";

export default function TodoList() {
    return (
        <div className="shadow-lg rounded-lg w-96 h-fit p-5 bg-white">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Todo-List</h1>
                <button className="p-2 rounded-md bg-blue-300 text-white font-bold">ADD</button>
            </div>
            <Container />
        </div>
    )
}