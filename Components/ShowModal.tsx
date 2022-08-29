import { useRecoilState } from "recoil"
import { modalState,movieState } from "../atoms/modalAtom"
import { Modal } from "@mui/material";
import { HandThumbUpIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState,useEffect } from "react";
import { Element } from "../Types";
import ReactPlayer from "react-player/lazy";
import { FaPlay, FaVolumeMute, FaVolumeUp,} from "react-icons/fa";

const ShowModal = () => {
    const [showModal,setShowModal]=useRecoilState(modalState);
    const [movie,setCurrentMovie]=useRecoilState(movieState);
    const [trailer,setTrailer]=useState('');
    const [genre,setGenre]=useState([]);
    const [muted,setMuted]=useState(true);

    useEffect(()=>{
      if(!movie)
      return;

      async function fetchData(){
        const data=await fetch(   `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`).then((res)=>res.json())
        .catch((error)=>console.log(error.message))

        if(data?.videos){
          const index=data.videos.results.findIndex((element:Element)=> element.type==='Trailer')
          setTrailer(data.videos?.results[index]?.key)
        }
        if(data?.genres){
            setGenre(data.genres);
        }
        }
      fetchData();

    },[movie])
    const handleClose=()=>{
      setShowModal(false);
    }
  return (
    <Modal open={showModal} onClose={handleClose} className="fixed !top-7 right-0 left-0 mx-auto w-full max-w-5xl
    overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
      <button 
      onClick={handleClose}
      className="modalButton absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:[#181818]">
        <XMarkIcon className="h-6 w-6" />
      </button>
      <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-4 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
             <button 
             className="flex  items-center gap-x-2 rounded bg-white px-6 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="w-7 h-7 text-black"/>
                Play
             </button>
             <button className="modalButton">
              <PlusIcon className="h-7 w-7"/>
             </button>
             <button className="modalButton">
              <HandThumbUpIcon className="h-7 w-7"/>
             </button>
            </div>
            <button className="modalButton" onClick={()=>setMuted(!muted)}>
            {!muted ? <FaVolumeUp className="h-6 w-6"/> : <FaVolumeMute className="h-6 w-6"/>}
            </button>
          </div>
          </div>

          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average*10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date }
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 py-1 text-sm ">
                 HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
            <div className="flex flex-col space-y-3 text-sm">
              <div>
                <span className="text-[gray]">Genres : </span>
                {genre.map((category:any)=>category.name).join(',')}
              </div>
              <div>
                <span className="text-[gray]">Original Language : </span>
                {movie?.original_language}
              </div>

              <div>
                <span className="text-[gray]">Total votes : </span>
                {movie?.vote_count}
              </div>
             </div>
            </div>
            </div>
          </div>
      </>
      </Modal>
  )
}

export default ShowModal