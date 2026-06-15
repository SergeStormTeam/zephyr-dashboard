import { SignalButtons } from "./SignalButtons"
import serge_logo from './../assets/serge_logo.png'


export const Header = () => {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex flex-row w-full items-center flex-1">
                <img className='h-12 w-auto object-contain' src={serge_logo} alt="Serge Logo" />
                <h3 className="pl-3 scroll-m-20  text-3xl tracking-tight first:mt-0" > Zephyr Dashboard </h3>
            </div>
            
            <SignalButtons></SignalButtons>
        </div>
    )
}