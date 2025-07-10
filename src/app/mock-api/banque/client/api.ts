import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { activities as activitiesData } from 'app/mock-api/pages/activities/data';
import { cloneDeep } from 'lodash-es';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientApi {
    private _activities: any = activitiesData;
    private baseUrl: string = environment.API_URL;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService, private _httpClient: HttpClient) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {

        this._fuseMockApiService
            .onGet('api/client/list', 300)
            .reply(({ request }) => {

                return this._httpClient.get(`${this.baseUrl}/customers`, {
                    params: request.params
                })
                    .pipe(
                        map((response: any) => {
                            return [response.status, response];
                        })
                    );
            });

        this._fuseMockApiService
            .onPost('api/client/add', 1000)
            .reply(({ request }) => {

                return this._httpClient.post(`${this.baseUrl}/customers`, request.body, {
                    params: request.params,
                })
                    .pipe(
                        map((response: any) => {
                            return [response.status, response];
                        })
                    );
            });
    }
}
