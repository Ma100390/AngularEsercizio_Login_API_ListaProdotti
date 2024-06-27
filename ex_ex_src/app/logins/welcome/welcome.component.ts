import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @Input() name: string = "";
  //@Input() avatar: string = "";
  @Input() lastname: string = "";
}

// Non necessariamente. La presenza di un output (@Output()) dipende dallo scopo e dalla funzionalità del componente.
//  Gli input (@Input()) vengono utilizzati per passare dati da un componente genitore a un componente figlio,
//  mentre gli output vengono utilizzati per comunicare dall'interno del componente figlio verso il componente genitore.