import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { User, Contact } from "@app/_models";
import {
  AuthenticationService,
  ContactService
} from "@app/_services";
import { Router } from "@angular/router";

@Component({ templateUrl: "contact.component.html" })
export class ContactComponent implements OnInit, OnDestroy {
  currentContact: User;
  currentContactSubscription: Subscription;
  contacts: Contact[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private contactService: ContactService,
    private router: Router
  ) {
    this.currentContactSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentContact = user;
      }
    );
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentContactSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.contactService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  updateContact(id: number) {
    this.router.navigate(["update-contact", id]);
  }

  private loadAllUsers() {
    this.contactService
      .getAll()
      .pipe(first())
      .subscribe(contacts => {
        this.contacts = contacts;
        console.log(this.contacts)
      });
  }
}
