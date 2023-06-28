import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(

 private afs: AngularFirestore,
 private afAuth: AngularFireAuth,
 private router: Router,
 private messageService: MessageService 
) {

 this.afAuth.authState.subscribe(user => {
   if (user) {
     this.userData = user;
     localStorage.setItem('user', JSON.stringify(this.userData));
     JSON.parse(localStorage.getItem('user')!);
   } else {
     localStorage.setItem('user', 'null');
     JSON.parse(localStorage.getItem('user')!);
   }
 })
}

//empezamos a crear con los metodos
setUserData(user: any) {
 const userRef: AngularFirestoreDocument<any> = this.afs.doc(
   `user/${user.uid}` 
 );
 const userData: User = {
   uid: user.uid,
   email: user.email,
   displayName: user.displayName,
   photoURL: user.photoURL,
   emailVerified: user.emailVerified
 };
 return userRef.set(userData, { 
   merge:true 
 });
}

//CREAR EL METODO INICIAR SESION
login(email:string, password: string){
 return this.afAuth.signInWithEmailAndPassword(email, password)
 .then(result=>{
   this.setUserData(result.user);
   this.afAuth.authState.subscribe(user=>{ 
     if (user) {
       this.messageService.add({severity:'success', summary: 'Bienvenido!', detail: ':D'});
       this.router.navigate(['home']);
     }
   })
 }).catch(()=>{ 
   this.messageService.add({severity:'error', summary: 'Error', detail: 'Las credenciales no son correctas'});
 })
}

//METODO PARA REGISTRAR
register(email:string, password: string){
 return this.afAuth.createUserWithEmailAndPassword(email,password)
 .then(result=>{
   result.user?.sendEmailVerification();
   this.setUserData(result.user);
   this.router.navigate(['login'])
   this.messageService.add({severity:'success', summary: 'Success', detail: 'Registrado correctamente'});
 }).catch(()=>{
   this.messageService.add({severity:'error', summary: 'Error', detail: 'Las credenciales no son correctas'}); 
 })
}


recoverpassword(email: string){
  return this.afAuth.sendPasswordResetEmail(email)
  .then(()=>{
    this.router.navigate(['login'])
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Revice su correo que se le envió un mensaje'});
  }).catch(()=>{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Las credenciales no son correctas'}); 
  })
}

//metodo para cerrar sesion
logout(){
  return this.afAuth.signOut().then(()=>{
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  })
}

}
