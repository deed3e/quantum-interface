import { useLocation, useParams } from 'react-router-dom'

const usePath: any = () => {
    let { pathname } = useLocation()
    const params = useParams()
    return Object.entries(params).reduce((path: any, [key, value]) => {
        return path.replace(`/${value}`, `/:${key}`)
    }, pathname)
}

export default usePath
