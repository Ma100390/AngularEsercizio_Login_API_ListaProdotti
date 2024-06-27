import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
//import { NgForm } from '@angular/forms';
//import { AuthenticationService } from './logins/authentication.service';
import { ProdcutsService } from '../../products/products.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  //@ViewChild('loginForm') loginForm:NgForm | undefined;

  @Output() logged = new EventEmitter<boolean>();
  // Immagina che questo sia un "segnale" che il componente invia al mondo esterno.
  // Quando qualcuno si accede con successo, questo segnale viene attivato e invia un messaggio
  // che dice "Qualcuno si è appena connesso con successo!" e questo messaggio è vero (true).
  login$:Observable<{token:string}> | undefined;
  // Questa è una "scatola" speciale che può contenere un messaggio.
  // Il messaggio che questa scatola può contenere è un "token",
  // che è una specie di chiave segreta per accedere a qualcosa.
  // Ma all'inizio, questa scatola è vuota, quindi non contiene nulla (è "undefined").
  private loginSubscription:Subscription | undefined;
  // : Questo è un "ascoltatore" che sta ascoltando attentamente quella scatola speciale chiamata login$.
  // Quando qualcosa viene messo dentro la scatola, questo ascoltatore lo "sente" e può fare qualcosa in risposta.
  userName:string = "";
  password:string = "";
  //loginResult:string = "";
  //isLogged:boolean = false;

  //constructor(private authenticationService:AuthenticationService) {}
  //constructor(private productsService:ProdcutsService) {}
  constructor(private authService:AuthService) {}
  // Immagina che il constructor sia il punto di partenza quando crei il tuo componente.
  // È come quando inizi un gioco e ottieni alcune risorse speciali, come un'arma segreta.
  // In questo caso, private authService: AuthService è come ottenere il servizio AuthService e
  // Tenerlo a portata di mano per usarlo più tardi nel gioco.
  ngOnInit(): void {
    console.log("Inizio del metodo ngOnInit");
    // : Questo è come il momento in cui il tuo personaggio nel gioco
    //  mette in ordine le sue armi prima di entrare in azione. Nel tuo caso,
    //  ngOnInit è il posto dove puoi mettere a punto alcune cose nel tuo componente,
    //   anche se ora è vuoto, quindi il tuo personaggio è pronto ma non ha ancora fatto nulla di speciale.
    // console.log("LoginComponent -> ngOnInit()");

    //this.loginResult = "";
  }

  ngOnDestroy(): void {
    // console.log("LoginComponent -> ngOnDestroy()");
    console.log("Inizio del metodo ngOnDestroy");
    this.loginSubscription?.unsubscribe();
    //  Questo è come quando il tuo personaggio nel gioco decide di smettere di giocare e andare a fare altro.
    //   Nel tuo caso, ngOnDestroy è il posto dove puoi decidere di "smettere di ascoltare"
    //   alcune cose quando il tuo componente viene distrutto, come smettere di ascoltare un certo tipo di messaggi
    //   o disconnettersi da qualcosa. Il this.loginSubscription?.unsubscribe();
    //   è come dire: "Se sto ascoltando qualcosa, smetto di farlo prima di uscire dal gioco."
  }

  submit():void
  {
    console.log("Inizio del metodo submit");
    console.log("Valore di this.userName: " + this.userName);
    console.log("Valore di this.password: " + this.password);
    // console.log("LoginComponent -> submit()");

    // //console.log(this.loginForm);

    // console.log("LoginComponent -> this.userName: " + this.userName);
    // console.log("LoginComponent  -> this.password: " + this.password);

    // this.productsService
    //   .login(this.uname, this.password)
    //   .subscribe({
    //     next: (jwtTokenObject: {access_token:string}) => {
    //       console.log(jwtTokenObject.access_token);
    //       //this.isLogged = true;

    //       this.logged.emit(true);
    //     }
    // });

    this.login$ = this.authService.login(this.userName, this.password);
    // : Qui stiamo chiamando una funzione speciale chiamata login che si trova nel servizio AuthService.
    //  Questa funzione è come una magia che prova a farci entrare nel gioco usando il nostro nome utente e la nostra password.
    //  Se tutto va bene, questa magia ci darà qualcosa di speciale chiamato "token".
    this.loginSubscription = this.login$.subscribe({
      // this.login$ = ...: Abbiamo una scatola speciale chiamata login$ dove vogliamo mettere il nostro "token" speciale.
      //  Quindi, stiamo dicendo: "Prendi il risultato della magia e mettilo nella nostra scatola login$".
      // this.login$.subscribe({ ... }): Ora, abbiamo qualcuno che sta ascoltando attentamente la nostra scatola login$.
      // Quando finalmente otteniamo il nostro "token" speciale dalla magia, questa persona ascoltante fa qualcosa.
      //  In questo caso, dice: "Ehi, ho ottenuto un 'token'! Ora diciamo al mondo esterno che siamo entrati nel gioco!",
      //   e lo comunica tramite this.logged.emit(true).
      next:(jwtTokenObject:{token:string}) => {
        // next:(jwtTokenObject:{token:string}) => {: È come dire, "Ehi, ho qualcosa da dirti quando tutto va bene!".
        //  Quindi, quando otteniamo il "token", il codice all'interno delle parentesi graffe {} verrà eseguito.
        console.log("Token ottenuto con successo:", jwtTokenObject.token);
        //this.isLogged = true;

        this.logged.emit(true);
        // this.logged.emit(true);: Ora, quando abbiamo il nostro "token" magico, vogliamo dirlo a tutti gli amici che ci ascoltano. 
        // Quindi, stiamo dicendo: "Ehi, amici, ho appena ottenuto il mio 'token' magico e sono entrato nel mondo magico!".
      }
    });
  }
}
// Certamente, continuiamo la conversazione tra amici al bar, includendo i termini "Observable", "loginSubscription", "constructor", "this", e "next":
// Amico 1: "Ehi, ragazzi, ho fatto un componente per il login nel mio sito web!"
// Amico 2: "Oh, davvero? Come funziona?"
// Tu (il proprietario del componente): "Beh, quando qualcuno cerca di fare il login, il componente chiama una funzione speciale che ho nel mio servizio di autenticazione. È come una magia che cerca di far entrare le persone."
// Amico 1: "Magia? Che intendi?
// Tu: "La magia è una funzione che restituisce qualcosa chiamato 'Observable'. È come una radio che ascolta le notizie."
// Amico 2: "Quindi, qusta radio ascolta qualcosa di speciale?"
// Tu: "Esattamente! La radio ascolta se siamo riusciti a entrare con successo nel sito web. Se ci riusciamo, la radio riceve un 'token' magico."
// Amico 1: "Un 'token' magico? Cosa fai con esso?
// Tu: "Bene, metto il 'token' magico in una scatola speciale chiamata 'login$'. È come se stessi mettendo il biglietto per il parco divertimenti in una scatola."
// Amico 2: "E chi ascolta questa radio?
// Tu: "Ho un amico, chiamiamolo 'ascoltatore', che sta attento alla radio 'Observable'. Quando finalmente riceviamo il 'token' magico, l'ascoltatore dice: 'Ehi, ho ottenuto il biglietto! Siamo entrati nel mondo segreto!'"
// Amico 1: "Ah, capisco! E cosa succede quando l'ascoltatore sente qualcosa?"
// Tu: "Bene, l'ascoltatore è come un mago. Dice 'next' e fa una magia con il 'token' magico."
// Amico 2: "E cosa fa questa magia?"
// Tu: "La magia è semplice: dice al mondo esterno che siamo entrati nel gioco! Lo fa con this.logged.emit(true);."
// Amico 1: "Ah, ora ho capito! È come se avessi una radio che ascolta se sei riuscito a entrare nel parco divertimenti, e quando ci riesci, il mago lo dice a tutti gli altri!"
// Tu: "Esattamente! È un po' complicato, ma è come avere un ingresso speciale per il parco divertimenti e dirlo a tutti gli amici quando entriamo!"
// Spero che questa versione della conversazione aiuti a chiarire il significato di "Observable", "loginSubscription", "constructor", "this", e "next" nel contesto del tuo componente di login.