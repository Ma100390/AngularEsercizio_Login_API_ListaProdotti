import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../logins/userdata';

interface UserDatatDTO {
  id:number;
  email:string;
  name:{
      firstname:string;
      lastname:string;
  };
  phone:string;
}
// ! Quindi, l'interface ci aiuta a capire meglio i dati che riceviamo."
// Tu: "Esattamente! È come una mappa che ci guida quando esploriamo nuovi dati da 'fakestoreapi.com'."
@Injectable({
  providedIn: 'root'
})
// Angular vede questo segnale ( il tuo servizio AuthService) : 'Va bene, amico, userò questo servizio ovunque tu ne avrai bisogno.'
//  Lo rende praticamente disponibile in tutto il nostro progetto Angular."
export class AuthService {

  private loginUrl = "https://fakestoreapi.com/auth/login";
  //private userDataUrl = "https://api.escuelajs.co/api/v1/auth/profile";
  private userDataUrl = "https://fakestoreapi.com/users/1"
  private jwtToken:string = "";

  constructor(private http:HttpClient) { }
  // "HttpClient è il nostro amico magico che ci aiuta a comunicare con il mondo esterno, giusto?

  getJwtToken():string 
  {
    return this.jwtToken;
  }

  login(uname:string, password:string): Observable<{token:string}> {
    return this.http.post<{token:string}>(this.loginUrl, {
      // email: "john@mail.com",
      // password: "changeme"
      username: "johnd",
      password: "m38rmF$"
    }).pipe(
      tap((jwtTokenObject:{token:string}) => {
        this.jwtToken = jwtTokenObject.token;
        //localStorage.setItem("token", jwtTokenObject.token);
      })
    );
  }
//   amico 1: "Ok, stiamo guardando questa parte del servizio AuthService:
//    login(uname: string, password: string): Observable<{token: string}>
//    { ... }. Cosa fa esattamente?"
// Tu (il proprietario del componente): "Questo è il nostro codice magico per effettuare il login!
//  Diciamo al nostro servizio che vogliamo fare il login, e gli diamo il nostro nome utente e la password."
// Amico 2: "Quindi, stiamo facendo una richiesta a qualche posto segreto?"
// Tu: "Esattamente! Stiamo facendo una richiesta speciale a un posto chiamato this.loginUrl.
//  È come bussare alla porta segreta per accedere al nostro account."
// Amico 1: "E cosa diamine è questo {token: string}?"
// Tu: "Oh, è come una mappa che ci dice che quando otteniamo una risposta, dovrebbe contenere un 'token' 
// speciale che ci permette di accedere a parti protette del gioco."
// Amico 2: "E cosa succede quando otteniamo la risposta?
// Tu: "Qui sta la parte interessante! Quando otteniamo il 'token' speciale, 
// usiamo la magia di pipe e tap per fare due cose. Prima, mettiamo il 'token' 
// nella nostra scatola magica chiamata jwtToken."
// Amico 1: "Ma cosa è questa scatola magica jwtToken?"
// Tu: "Ecco dove conserviamo il nostro 'token' segreto per usarlo più tardi.
//  È come una chiave magica che ci permette di aprire porte speciali."
// Amico 2: "E la seconda cosa che facciamo con pipe e tap?"
// Tu: "Usiamo tap per dire: 'Ehi, caro servizio, quando otteniamo il 'token', 
// assicurati di metterlo nella nostra scatola jwtToken.'"
// Amico 1: "Quindi, il nostro servizio si assicura che abbiamo il 'token' per usarlo?"

// Tu: "Esatto! Una volta ottenuto il 'token', possiamo usarlo per accedere a parti speciali del gioco."
// Spero che questa spiegazione dettagliata e amichevole ti aiuti a capire meglio come funziona il
//  metodo login nel tuo servizio AuthService!

  logout()
  {
    this.jwtToken = "";
  }

  getUserData() {
    console.log("Inizio del metodo getUserData");
  
    return this.http.get<UserDatatDTO>(this.userDataUrl, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.jwtToken})
    }).pipe(
      tap(() => {
        console.log("Richiesta al server inviata con successo");
      }),
      map(userData => {
        console.log("Dati grezzi ottenuti dal server:", userData);
  
        const userDataFormatted = this.getUserDataFromUserDatatDTO(userData);
        console.log("Dati dell'utente formattati:", userDataFormatted);
  
        return userDataFormatted;
      })
    );
  }
//   Amico 1: "Ora stiamo guardando un altro pezzo del servizio AuthService: getUserData() { ... }. 
//   Cosa fa questo?"
// Tu (il proprietario del componente): "Questo metodo è come il nostro biglietto d'ingresso per ottenere
//  i dati dell'utente dal server. Diciamo al server: 'Hey, vogliamo i dati dell'utente, per favore!'"
// Amico 2: "Ma come fa il server a sapere chi siamo?
// Tu: "Ecco il trucco! Guarda questa parte: headers:
//  new HttpHeaders({'Authorization': 'Bearer ' + this.jwtToken}).
//   Qui stiamo mostrando al server il nostro 'biglietto magico' chiamato 'jwtToken'.
//    È come dire: 'Abbiamo il permesso di entrare e ottenere questi dati.'"
// Amico 1: "Quindi, il server sa chi siamo grazie al nostro 'jwtToken'.
// Tu: "Esatto! Il 'jwtToken' è la chiave segreta che ci fa riconoscere."
// Amico 2: "E una volta che otteniamo i dati, cosa ne facciamo?"
// Tu: "Ottima domanda! Usiamo il potere di pipe e map. 
// La parte map è come la nostra bacchetta magica. Prendiamo i dati grezzi che 
// otteniamo dal server e li trasformiamo in una forma più facile da usare."
// Amico 1: "E cosa fa questa funzione getUserDataFromUserDatatDTO(userData: UserDatatDTO)?
// Tu: "Ah, quella è la nostra magia speciale! Prende i dati grezzi che otteniamo dal server e 
// li trasforma in una forma più comprensibile. Estraiamo il nome e il cognome dall'oggetto 
// complicato che riceviamo."
// Amico 2: "Quindi, alla fine abbiamo i dati dell'utente pronti per l'uso."
// Tu: "Esatto! Ora possiamo usarli facilmente nel nostro gioco o nella nostra applicazione."
// Spero che questa spiegazione dettagliata e amichevole ti aiuti a capire come funziona il metodo 
// getUserData nel tuo servizio AuthService!


  private getUserDataFromUserDatatDTO(userDataDTO: UserDatatDTO):UserData {
    return {
      userName: userDataDTO.name.firstname,
      userLastname: userDataDTO.name.lastname,
      //userAvatar: userDataDTO.avatar,
    };
  }
}



//la dependesi injiection costruttore ecc espone l'oggetto httpclient
// chiamata di loging si fa il POST con errore 403 e 401 il token scade oppure evi rifare il login perchè serve il jwt token