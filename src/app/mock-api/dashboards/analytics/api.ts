import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { analytics as analyticsData } from 'app/mock-api/dashboards/analytics/data';
import { environment } from 'environments/environment';
import { cloneDeep } from 'lodash-es';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsMockApi {
    private _analytics: any = analyticsData;
    private baseApiUrl = environment.API_URL;


    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService, private httpClient: HttpClient) {
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
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/dashboards/analytics')
            .reply(() => [200, cloneDeep(this._analytics)]);

        this._fuseMockApiService
            .onGet(`api/stats/agence`, 300)
            .reply(({ request }) => {

                const idAgence = request.params.get('idAgence');
                const dateDebut = request.params.get('dateDebut');
                const dateFin = request.params.get('dateFin');



                return this.httpClient.get(`${this.baseApiUrl}cycle/statistiqueTontineBetweenTwoDatesAndAgence`, {
                    params: {
                        idAgence,
                        dateDebut,
                        dateFin
                    }
                })
                    .pipe(
                        map((response: any) => {
                            return [response.status, response];
                        })
                    );

                // return [200, {}];
            });

        this._fuseMockApiService
            .onGet(`api/stats/full`, 300)
            .reply(({ request }) => {

                const dateDebut = request.params.get('dateDebut');
                const dateFin = request.params.get('dateFin');


                return this.httpClient.get(`${this.baseApiUrl}cycle/statistiqueTontineBetweenTwoDates`, {
                    params: {
                        dateDebut,
                        dateFin
                    }
                })
                    .pipe(
                        map((response: any) => {
                            return [response.status, response];
                        })
                    );

                // return [200, {}];
            });


        this._fuseMockApiService
            .onGet(`api/stats/getStatsClientsCashplus`, 300)
            .reply(({ request }) => {

                const dateDebut = request.params.get('dateDebut');
                const dateFin = request.params.get('dateFin');


                return this.httpClient.get(`${this.baseApiUrl}compte/statistiqueClientsCashplusBetweenTwoDates`, {
                    params: {
                        dateDebut,
                        dateFin
                    }
                })
                    .pipe(
                        map((response: any) => {
                            return [response.status, response];
                        })
                    );

                // return [200, {}];
            });

        this._fuseMockApiService
            .onGet(`api/stats/getStatsClientsTontine`, 2000)
            .reply(({ request }) => {

                return this.httpClient.get(`${this.baseApiUrl}cycle/client_tontine_stat`)
                    .pipe(
                        map((response: any) => {
                            return [response.status, response];
                        })
                    );

                // return [200, {}];
            });

    }
}
