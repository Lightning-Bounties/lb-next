/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AuthService } from './services/AuthService';
import { IssuesService } from './services/IssuesService';
import { RepositoriesService } from './services/RepositoriesService';
import { RewardsService } from './services/RewardsService';
import { UsersService } from './services/UsersService';
import { WalletsService } from './services/WalletsService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class lb {
    public readonly auth: AuthService;
    public readonly issues: IssuesService;
    public readonly repositories: RepositoriesService;
    public readonly rewards: RewardsService;
    public readonly users: UsersService;
    public readonly wallets: WalletsService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.auth = new AuthService(this.request);
        this.issues = new IssuesService(this.request);
        this.repositories = new RepositoriesService(this.request);
        this.rewards = new RewardsService(this.request);
        this.users = new UsersService(this.request);
        this.wallets = new WalletsService(this.request);
    }
}

