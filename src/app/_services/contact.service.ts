import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Contact } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Contact[]>(`${environment.apiUrl}/contacts`);
    }

    getById(id: number): Observable<Contact> {
        return this.http.get<Contact>(`${environment.apiUrl}/contacts/${id}`);
    }

    create(contact: Contact) {
        return this.http.post(`${environment.apiUrl}/contacts/create`, contact);
    }

    update(contact: Contact) {
      return this.http.put(`${environment.apiUrl}/update-contact/${contact.id}`, contact);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/contacts/${id}`);
    }
}