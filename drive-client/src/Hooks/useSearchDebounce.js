import React, {useRef , useCallback } from 'react'

const useSearchDebounce = (fn,delay=500) =>{
    let timer  = useRef(null)
    const debouncedFn = useCallback((...args)=>{
        if(timer.current){
           clearTimeout(timer.current)
        }
        timer.current = setTimeout(()=>{
            fn(...args)
        },delay)
    },[fn,delay])
    return debouncedFn
}

export default useSearchDebounce


