import { AxiosInstance } from "axios"
import { userApi } from "../api/user.api"

const setAuthInterceptor = (
    axiosInstace: AxiosInstance
) => {
    axiosInstace.interceptors.request.use((config) => {
        config.headers.Authorization = userApi.getAuthToken()
        return config
    })

    axiosInstace.interceptors.response.use((config) => {
        return config
    }, (config) => {
        if (config.response.status === 401 || config.response.status === 403) {
            
        }
        return config
    })
}

export { setAuthInterceptor }
