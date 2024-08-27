import {lusitana} from './fonts';

export default function Heading(){
    return (
        <div className="flex flex-col items-center my-8">
    <h1 className={`${lusitana.className} text-4xl font-bold text-gray-800 mb-2`}>
        Welcome to <span className="text-blue-600">Approvify</span>
    </h1>
    <p className="text-lg text-gray-600">
        Security at its best, by <span className="font-semibold text-gray-700">CodeCave AI</span>
    </p>
</div>
    )
}