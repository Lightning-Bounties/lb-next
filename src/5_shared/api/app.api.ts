import axios from 'axios';
import { CancelablePromise, lb } from '../gen';
import { AxiosHttpRequest } from '../gen/core/AxiosHttpRequest';
import { ApiRequestOptions } from '../gen/core/ApiRequestOptions';
import { request } from '../gen/core/request';
import { API_URL } from '../consts/app.consts';

const apiInstance = axios.create({
    baseURL: API_URL,
});

const appApi = new lb(
    {},
    class AxiosHttpRequestInstance extends AxiosHttpRequest {
        public override request<T>(
            options: ApiRequestOptions,
        ): CancelablePromise<T> {
            return request(this.config, options, apiInstance);
        }
    },
);

export { appApi };
export { apiInstance };
