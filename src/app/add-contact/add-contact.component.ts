import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { first } from "rxjs/operators";

import { ContactService } from "@app/_services";
import { Contact } from "@app/_models";

@Component({ templateUrl: "add-contact.component.html" })
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  submitted = false;
  contact: Contact;
  contactTitle: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl("", [Validators.required, Validators.email])
    });

    this.route.paramMap.subscribe(params => {
      const contactId = +params.get("id");
      if (contactId) {
        this.contactTitle = "Update Contact";
        this.getContact(contactId);
      } else {
        this.contactTitle = "Add a new Contact";
        this.contact = {
          id: null,
          firstName: "",
          lastName: "",
          phoneNumber: null,
          email: ""
        };
      }
    });
  }

  getContact(contactId: number) {
    this.contactService.getById(contactId).subscribe(
      (contact: Contact) => {
        this.editContact(contact);
        this.contact = contact;
      },
      (err: any) => console.log(err)
    );
  }

  editContact(contact: Contact) {
    this.contactForm.patchValue({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      email: contact.email
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    this.mapFormValuesToContactModel();
    if (this.contact.id) {
      this.contactService.update(this.contact).subscribe(
        () => {
          this.router.navigate(["contacts"]);
        },
        (err: any) => console.log(err)
      );
    } else {
      this.contactService.create(this.contact).subscribe(
        () => {
          this.router.navigate(["contacts"]);
        },
        (err: any) => console.log(err)
      );
    }
    this.loading = true;
  }

  mapFormValuesToContactModel() {
    this.contact.firstName = this.contactForm.value.firstName;
    this.contact.lastName = this.contactForm.value.lastName;
    this.contact.phoneNumber = this.contactForm.value.phoneNumber;
    this.contact.email = this.contactForm.value.email;
  }
}
