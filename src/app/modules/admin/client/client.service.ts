import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {ActivatedRoute} from "@angular/router";

@Injectable({providedIn: 'root'})
export class ClientService
{
    private data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private activatedRoute: ActivatedRoute)
    {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get getListe$(): Observable<any>
    {
        return this.data.asObservable();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getClients(): Observable<any> {
        return this._httpClient.get('api/client/list');
    }

    addClient(client): Observable<any> {
        return this._httpClient.post('api/client/add',client);
    }



}
