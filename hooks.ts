import { useEffect, useState, useRef } from 'react';

export function useHeadsObserver() {
  const observer = useRef<IntersectionObserver>(null)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleObserver: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }
  
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0% -35% 0px"}
    )
  
    const elements = document.querySelectorAll("h2.showInTOC, h3.showInTOC, h4.showInTOC")
    elements.forEach((element) => 
    {
      if (observer.current)
        observer.current.observe(element)
    })
    return () => observer.current?.disconnect()
  }, [])

  return {activeId}
}