import { useRef, useEffect } from 'react'

type Props = {
  callback: (param?: any) => any
  isOpen: boolean
}

const useOutsideClick = (props: Props) => {
  const ref = useRef() as any

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props.callback()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [props.isOpen])

  return ref
}

export default useOutsideClick