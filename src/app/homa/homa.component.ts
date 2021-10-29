import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';
import { NotesService } from '../notes.service';
import {HttpHeaders} from '@angular/common/http'


declare var $ : any;



@Component({
  selector: 'app-homa',
  templateUrl: './homa.component.html',
  styleUrls: ['./homa.component.scss']
})



export class HomaComponent implements OnInit {

  
  token : any

  decodedToken : any

  allNotes : any

  isLoad : any = false;

  note_id : any

  constructor(public _AuthService : AuthService , public _NotesService : NotesService) {


    this.token  = localStorage.getItem('userToken');

    this.decodedToken = jwtDecode(this.token);

    this.getAllNotes()
    

   }


   addNote = new FormGroup({
     title: new FormControl('' , Validators.required),
     desc: new FormControl('' , Validators.required)

   })


   getAllNotes()
   {

    const httpOptions = {

      headers : new HttpHeaders({

        token : this.token,

        userID : this.decodedToken._id 

      })


    }

    this._NotesService.getAllNotes(httpOptions).subscribe( res => {

      this.allNotes = res.Notes;

      this.isLoad = true;

    } )

   }

   addData()
  {

    let data = {

      title : this.addNote.value.title,
      desc : this.addNote.value.desc,
      token : this.token,
      userID  : this.decodedToken._id
    }

    this._NotesService.addNote(data).subscribe(res=>{
      
      if( res.message == 'success' ){
        
        $("#addNote").modal('hide')
        
        this.getAllNotes()

      }
      
      


    })

  }


  getID(id : string)
  {
    this.note_id  = id;
  }

  deleteNote()
  {

    let data = {

      token : this.token,
      noteID : this.note_id

    }

    this._NotesService.deleteNote( data ).subscribe(res=>{

      if( res.message == 'deleted'){
        
        $("#deleteNote").modal('hide')
        
        this.getAllNotes()


      }

      
    })
  }

  setValue()
  {

    for (let index = 0; index < this.allNotes.length; index++) {
      
      if(this.allNotes[index]._id == this.note_id){

        this.addNote.controls.title.setValue(this.allNotes[index].title)
        this.addNote.controls.desc.setValue(this.allNotes[index].desc)
                
      }
      
    }

  }

  addUpdate()
  {

    let data = {

      title : this.addNote.value.title,
      desc : this.addNote.value.desc,
      NoteID : this.note_id,
      token : this.token

    }    

    this._NotesService.updateNote(data).subscribe(res=>{

      if( res.message == 'updated'){

        $("#editNote").modal('hide')
        
        this.getAllNotes()

        this.addNote.reset();

      }
      
      
    })


  }

  resetValue()
  {
    this.addNote.reset();
  }



  ngOnInit(): void {
  }

  

  

  


}
