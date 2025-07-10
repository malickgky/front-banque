import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/auth/auth.service";
import {MessageService} from "primeng/api";
import {ClientService} from '../client.service';
import {Button, ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {Drawer} from "primeng/drawer";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {InputText} from "primeng/inputtext";
import {finalize} from "rxjs";

@Component({
  selector: 'app-client-home',
  imports: [
    Button,
    TableModule,
    Drawer,
    ReactiveFormsModule,
    ButtonDirective,
    MatIconModule,
    MatMenuModule,
    InputText
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class ClientHomeComponent  implements OnInit {


  clients: any = [];
  isVisible: boolean = false;
  isLoading: boolean = false;
  vehiculeControl: FormControl = new FormControl('', Validators.required);
  vehicules: any = [];

  clientForm: FormGroup;


  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private messageService: MessageService,
      private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      nom: [null, Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
    });

    
    this.clientService.getClients().subscribe({
      next: response => {
        this.clients = response.data;
      }, error: response => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: response.error, life: 3000 });
      },
    });
  }


  showDialog() {
    this.isVisible = true;
  }

  cancel() {
    this.isVisible = false;
    this.vehiculeControl.reset();
    this.vehiculeControl.reset();
    this.clientForm.enable();
    this.clientForm.reset();
  }

  add() {
    this.isVisible = false;

    this.clientService.addClient(this.clientForm.value)
        .pipe(
            finalize(() => {
              this.clientForm.reset();
            })
        )
        .subscribe({
      next: response => {
        this.clients.unshift(response.data);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: response.message, life: 3000 });
      }, error: response => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: response.error, life: 3000 });
      }
    })
  }

  openEdit(client) {
    this.clientForm.patchValue(client);
    this.isVisible = true;
  }

}
