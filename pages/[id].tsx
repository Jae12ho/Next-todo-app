import { useRouter } from 'next/router';

const Detail = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="flex justify-center bg-blue-50 h-screen p-20">
            <p className="shadow-lg rounded-lg w-96 h-fit p-5 bg-white">Todo ID : {id}</p>
        </div>
    )
};

export default Detail;