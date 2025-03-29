import { useEffect, useRef, useState } from "react"
const useRefState = (initialValue = null) => {
    const [state, setState] = useState(initialValue)
    const stateRef = useRef(state)
    useEffect(() => {
        stateRef.current = state
    }, [state])
    return [state, stateRef, setState]
}
export default useRefState;