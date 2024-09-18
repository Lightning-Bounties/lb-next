import { appApi } from '@/5_shared/api/app.api'
import { API_URL } from '@/5_shared/consts/app.consts'

class UserApi {

    private UserApiKey = ['UserApiKey']

    async qkLoginWithGitHubCode(params: { code: string }) {
        return [this.UserApiKey, 'loginWithGitHubCode', params.code]
    }

    async loginWithGitHubCode(params: { code: string }) {
        const { access_token } = await appApi.auth.githubCallbackApiAuthGithubCallbackGet({
            code: params.code
        })

        return access_token
    }

    qkGetUserData() {
        return [this.UserApiKey, 'getUserData']
    }

    async getUserData() {
        const resp = await appApi.users.getAuthenticatedUserApiUsersMeGet()
        return resp
    }

    setAuthToken(token: string) {
        localStorage.setItem('accessToken', 'Bearer ' + token)
    }

    getAuthToken() {
        return localStorage.getItem('accessToken')
    }

    loginWithGitHub(initiatedAt: string) {
        const redirectUri = `${process.env.NEXT_PUBLIC_FRONT_URL}/login/?initiatedAt=` + initiatedAt
        window.location.href = `${API_URL}/api/auth/github?redirect_uri=${redirectUri}`
    }

    logout() {
        localStorage.setItem('accessToken', '')
    }

    getIsDarkTheme() {
        if (typeof window !== 'undefined') {
            const darkThemeFromLocalStorage = window.localStorage.getItem('darkTheme')
            if (darkThemeFromLocalStorage === undefined && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'true'
            }
            else if (darkThemeFromLocalStorage === 'true') {
                return 'true'
            }
            else
                return 'false'
        }
    }

    setIsDarkTheme(isDarkTheme: string) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('darkTheme', isDarkTheme)
        }
    }

}
const userApi = new UserApi()


export { userApi }