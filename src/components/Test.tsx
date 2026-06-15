type TestProps = {
    message: string
    num: number
    loggedIn: boolean
}

export const Test = (props: TestProps) => {
    return (
        <h2 className="text-purple-500 !text-purple-500"> 
            {props.loggedIn 
                ? `Meow ${props.message}` 
                : `No!`
            }
        </h2>
    )
}