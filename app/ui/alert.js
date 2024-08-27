export default function Alert(props){
    return(
        <>
        {props.alert && <div class="flex flex-col items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">You are registered successfully.</span> 
        </div>}
        </>
    )
}