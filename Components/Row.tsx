import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { useRef, useState } from "react"
import { Movie } from "../Types"
import Thumbnail from "./Thumbnail"

interface Props{
  title:string,
  movies:Movie[]
}

const Row = ({title,movies}:Props) => {
  const Rowref=useRef <HTMLDivElement>(null);
  const [isMoved,setMoved]=useState(false);


  const handleClick=(direction:string)=>{
   setMoved(true);
   if(Rowref.current){
    const {clientWidth,scrollLeft}=Rowref.current;

    const scrollTo=direction==="left"?scrollLeft-clientWidth:scrollLeft+clientWidth;
    Rowref.current.scrollTo({left:scrollTo,behavior:"smooth"})
   }
  }
  return (
    <div className="h-40 space-y-0.5 md:space-y-2"> 
      <h2 className="text-sm font-semibold w-56 cursor-pointer text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
      <div className="group relative md:ml-2">
        <ChevronLeftIcon className={`RowArrows left-2 ${!isMoved && "hidden"}`} onClick={()=>handleClick("left")}/>
        <div ref={Rowref} className="flex items-center space-x-0.5 scrollbar-hide overflow-x-scroll md:space-x-2.5 md:p-2">
          {movies.map((movie)=>{
            return (
              <Thumbnail key={movie.id} movie={movie}/>
            )
          })}
        </div>
        <ChevronRightIcon className={`RowArrows right-2`} onClick={()=>handleClick("right")}/>
      </div>
    </div>
  )
}

export default Row