import { useEffect, useState, useRef } from "react"
import { getSlides, type SlideData, type SlidesResponse } from "../../api/slide.api"
import PopupForm from "../../components/PopupForm"

const AUTO_TIME = 6000

const HomeCarousel = () => {

  const [slides,setSlides] = useState<SlideData[]>([])
  const [current,setCurrent] = useState(0)
  const [paused,setPaused] = useState(false)
  const [loading,setLoading] = useState(true)
  const [showForm,setShowForm] = useState(false)

  const startX = useRef(0)
  const timerRef = useRef<any>(null)

  /* ---------------- FETCH SLIDES ---------------- */

  useEffect(()=>{

    const load = async()=>{

      try{

        const res = await getSlides()
        const api = res.data as SlidesResponse

        const active =
          api.result.data
            .filter(s=>s.is_active==="1")
            .sort((a,b)=>Number(a.sort_order)-Number(b.sort_order))

        setSlides(active)

      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }

    }

    load()

  },[])

  /* ---------------- AUTOPLAY ---------------- */

  useEffect(()=>{

    if(paused || slides.length <= 1) return

    if(timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(()=>{

      setCurrent(prev => (prev+1) % slides.length)

    },AUTO_TIME)

    return ()=>clearTimeout(timerRef.current)

  },[current,paused,slides])

  /* ---------------- SWIPE ---------------- */

  const touchStart=(e:any)=>{
    startX.current = e.touches[0].clientX
  }

  const touchEnd=(e:any)=>{

    const endX = e.changedTouches[0].clientX

    if(startX.current-endX>50)
      setCurrent(p=>(p+1)%slides.length)

    if(endX-startX.current>50)
      setCurrent(p=>(p-1+slides.length)%slides.length)

  }

  /* ---------------- FILE URL ---------------- */

  const fileUrl=(p:string)=>{
    if(p.startsWith("http")) return p
    return `http://aniwell.shreesoftit.com${p}`
  }

  if(loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    )

  if(slides.length===0) return null

  const prev = (current - 1 + slides.length) % slides.length
  const next = (current + 1) % slides.length

  const slide = slides[current]

  return (

  <>
  
  <div
    className="relative h-screen w-full overflow-hidden bg-black perspective"
    onMouseEnter={()=>setPaused(true)}
    onMouseLeave={()=>setPaused(false)}
    onTouchStart={touchStart}
    onTouchEnd={touchEnd}
  >

    {/* Slides */}

    {slides.map((s,i)=>{

      let position = "hidden"

      if(i===current) position="center"
      else if(i===prev) position="left"
      else if(i===next) position="right"

      return (

      <div
        key={s.id}
        className={`slide3d ${position}`}
      >

        {s.type==="video" ? (

          <video
            src={fileUrl(s.file_path)}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />

        ):(
          <img
            src={fileUrl(s.file_path)}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20"/>

      </div>

      )

    })}

    {/* CONTENT */}

    <div className="absolute inset-0 flex items-center z-20 pt-20 md:pt-0">

      <div className="container mx-auto px-6 lg:px-12">

        <div className="text-white max-w-xl md:max-w-2xl">

          {/* Caption */}

          {slide.caption && (
            <p className="text-orange-400 mb-3 text-xs sm:text-sm md:text-base font-medium animate-fade">
              {slide.caption}
            </p>
          )}

          {/* Title */}

          {slide.title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-title">
              {slide.title}
            </h1>
          )}

          {/* Description */}

          {slide.description && (
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 max-w-lg animate-desc">
              {slide.description}
            </p>
          )}

          {/* FEATURES */}

          {slide.additional_info?.length > 0 && (

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-6 text-sm md:text-base text-white/90">

              {slide.additional_info
                .filter(info=>info.isActive)
                .map((info,index)=>(

                <div key={index} className="flex items-center gap-2 whitespace-nowrap">

                  <svg
                    className="w-4 h-4 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>{info.text}</span>

                </div>

              ))}

            </div>

          )}

          {/* BUTTON */}

          {slide.show_book_consultation==="1" && (

            <button
              onClick={()=>setShowForm(true)}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-lg font-semibold transition transform hover:scale-105"
            >
              {slide.button_text?.trim() || "Book Free Consultation"}
            </button>

          )}

        </div>

      </div>

    </div>

    {/* INDICATORS */}

    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">

      {slides.map((_,i)=>(

        <button
          key={i}
          onClick={()=>setCurrent(i)}
          className={`rounded-full transition-all ${
            i===current
              ? "w-8 h-2 bg-orange-500"
              : "w-2 h-2 bg-white/40"
          }`}
        />

      ))}

    </div>

  </div>

  {showForm && <PopupForm onClose={()=>setShowForm(false)} />}

  </>

  )

}

export default HomeCarousel

// import { useEffect, useState, useRef } from "react"
// import { getSlides, type SlideData, type SlidesResponse } from "../../api/slide.api"
// import PopupForm from "../../components/PopupForm"

// const AUTO_TIME = 6000

// const HomeCarousel = () => {

//   const [slides,setSlides] = useState<SlideData[]>([])
//   const [current,setCurrent] = useState(0)
//   const [loading,setLoading] = useState(true)
//   const [paused,setPaused] = useState(false)
//   const [showForm,setShowForm] = useState(false)

//   const progressRef = useRef<HTMLDivElement>(null)
//   const startX = useRef(0)

//   /* ---------------- FETCH SLIDES ---------------- */

//   useEffect(()=>{

//     const load = async()=>{

//       try{

//         const res = await getSlides()
//         const api = res.data as SlidesResponse

//         const active =
//           api.result.data
//             .filter(s=>s.is_active==="1")
//             .sort((a,b)=>Number(a.sort_order)-Number(b.sort_order))

//         setSlides(active)

//       }catch(e){

//         console.error(e)

//       }finally{

//         setLoading(false)

//       }

//     }

//     load()

//   },[])

//   /* ---------------- AUTO SLIDE ---------------- */

//   useEffect(()=>{

//     if(paused || slides.length===0) return

//     const timer = setInterval(()=>{

//       setCurrent(p=>(p+1)%slides.length)

//     },AUTO_TIME)

//     return ()=>clearInterval(timer)

//   },[paused,slides])

//   /* ---------------- PROGRESS ---------------- */

//   useEffect(()=>{

//     if(!progressRef.current) return

//     progressRef.current.style.animation="none"

//     requestAnimationFrame(()=>{

//       if(progressRef.current)
//         progressRef.current.style.animation=`progress ${AUTO_TIME}ms linear`

//     })

//   },[current])

//   /* ---------------- SWIPE ---------------- */

//   const touchStart=(e:any)=>{

//     startX.current = e.touches[0].clientX

//   }

//   const touchEnd=(e:any)=>{

//     const endX = e.changedTouches[0].clientX

//     if(startX.current-endX>50)
//       setCurrent(p=>(p+1)%slides.length)

//     if(endX-startX.current>50)
//       setCurrent(p=>(p-1+slides.length)%slides.length)

//   }

//   /* ---------------- FILE URL ---------------- */

//   const fileUrl=(p:string)=>{

//     if(p.startsWith("http")) return p

//     return `http://aniwell.shreesoftit.com/${p}`

//   }

//   if(loading)
//     return (
//       <div className="h-screen flex items-center justify-center bg-black text-white">
//         Loading...
//       </div>
//     )

//   if(slides.length===0) return null

//   const slide = slides[current]

//   /* ---------------- UI ---------------- */

//   return (

//   <>
  
//   <div
//     className="relative h-screen w-full overflow-hidden bg-black"
//     onMouseEnter={()=>setPaused(true)}
//     onMouseLeave={()=>setPaused(false)}
//     onTouchStart={touchStart}
//     onTouchEnd={touchEnd}
//   >

//     {/* Slides */}

//     {slides.map((s,i)=>(

//       <div
//         key={s.id}
//         className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
//           i===current
//           ? "opacity-100 scale-100 z-10"
//           : "opacity-0 scale-110"
//         }`}
//       >

//         {s.type==="video" ? (

//           <video
//             src={fileUrl(s.file_path)}
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             className="absolute inset-0 w-full h-full object-cover"
//           />

//         ):(
//           <img
//             src={fileUrl(s.file_path)}
//             loading="lazy"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         )}

//         {/* Parallax Overlay */}

//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"/>

//       </div>

//     ))}

//     {/* Content */}

//     <div className="absolute inset-0 z-20 flex items-center">

//       <div className="container mx-auto px-6">

//         <div className="max-w-3xl text-white">

//           {/* Caption */}

//           <p className="text-orange-400 mb-4 opacity-0 animate-caption">

//             {slide.caption}

//           </p>

//           {/* Title */}

//           <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight opacity-0 animate-title">

//             {slide.title}

//           </h1>

//           {/* Description */}

//           <p className="text-lg mb-8 max-w-xl opacity-0 animate-desc">

//             {slide.description}

//           </p>

//           {/* Button */}

//           {slide.show_book_consultation==="1" &&(

//             <button
//               onClick={()=>setShowForm(true)}
//               className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105"
//             >
//               {slide.button_text || "Book Free Consultation"}
//             </button>

//           )}

//         </div>

//       </div>

//     </div>

//     {/* Progress Bar */}

//     <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">

//       <div
//         ref={progressRef}
//         className="h-full bg-orange-500"
//       />

//     </div>

//     {/* Indicators */}

//     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">

//       {slides.map((_,i)=>(

//         <button
//           key={i}
//           onClick={()=>setCurrent(i)}
//           className={`rounded-full transition-all ${
//             i===current
//               ? "w-8 h-2 bg-orange-500"
//               : "w-2 h-2 bg-white/40"
//           }`}
//         />

//       ))}

//     </div>

//   </div>

//   {showForm && <PopupForm onClose={()=>setShowForm(false)} />}

//   </>
//   )

// }

// export default HomeCarousel