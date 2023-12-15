import {useDispatch, useSelector} from "react-redux"
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Link, useRouteError } from "react-router-dom";

function Chattitle() {
    const navigate = useNavigate();
    const thisFriend = useSelector((state) => state.user.thisFriend);
    return (
        <div className='flex justify-between px-2 mb-2'>
            <div className='flex'>
                <GoArrowLeft size={30} className='mt-1 me-3'onClick={()=>navigate("/home")}/>
                <div className='text-2xl'>{thisFriend}</div>
            </div>
            <div>
                <Link className='' to={"/home/chat/pinned"}>
                    <button className='px-5 py-1 me-5 bg-gray-300 hover:bg-gray-400 border-2 rounded-md'>Pinned</button>
                </Link>
            </div>
        </div>
    )
}

export default Chattitle