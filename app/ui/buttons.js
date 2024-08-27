import Link from "next/link"

export default function Button({content}){
    return (
<div className="flex flex-col items-center">
    <Link
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3 mb-2 shadow-lg transform transition-transform hover:scale-105 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4"
        href={content === 'register' ? '/register' : '/login'}
    >
        {content}
    </Link>
</div>
    )
}