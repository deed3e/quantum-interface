import { useCallback, useState, useEffect } from 'react'

const VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document

function isWindowVisible() {
    return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden'
}

/**
 * Returns whether the window is currently visible to the user.
 */
export default function useIsWindowVisible(): boolean {
    const [focused, setFocused] = useState<boolean>(isWindowVisible())
    //eslint-disable-next-line
    const listener = useCallback(() => {
        setFocused(isWindowVisible())
    }, [setFocused])

    useEffect(() => {
        if (!VISIBILITY_STATE_SUPPORTED) return undefined

        document.addEventListener('visibilitychange', listener)
        return () => {
            document.removeEventListener('visibilitychange', listener)
        }
    }, [listener])

    return focused
}
