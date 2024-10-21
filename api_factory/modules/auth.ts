import { GATEWAY_ENDPOINT } from '../axios.config'
export const auth_api = {
	$_login: (credential: any) => {
		const url = '/auth/login'
		return GATEWAY_ENDPOINT.post(url, credential)
	}
}
