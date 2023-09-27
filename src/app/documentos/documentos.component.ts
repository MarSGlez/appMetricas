import { Component, OnInit, inject  } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController } from '@ionic/angular';
import { ref, uploadBytesResumable, getDownloadURL  } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import * as math from 'mathjs';
import { Metricas } from 'src/app/interface/metricas';
//import * as fs from "fs";




@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent  implements OnInit {
	private storage: Storage = inject(Storage);
  metricas: Metricas[] = [];

  delimiters: string[] = ['(', ')', '[', ']', '{', '}', ',', '.', ';', '@', "'", "'"];
  operators: Record<string, number> = {
    '=': 0,
    '+': 0,  
    '-': 0,
    '*': 0,
    '/': 0,
    '%': 0,
    '@': 0,
    '&': 0,
    '|': 0,
    '^': 0,
    '~': 0,
    '<': 0,
    '>': 0,
    ':': 0,
    '**': 0,
    '//': 0,
    '<<': 0,
    '>>': 0,
    '<=': 0,
    '>=': 0,
    '==': 0,
    '!=': 0,
    '->': 0,
    '+=': 0,
    '-=': 0,
    '*=': 0,
    '/=': 0,
    '%=': 0,
    '@=': 0,
    '&=': 0,
    '|=': 0,
    '^=': 0,
    '//=': 0,
    '>>=': 0,
    '<<=': 0,
    '**=': 0,
    'False': 0,
    'None': 0,
    'True': 0,
    'and': 0,
    'as': 0,
    'assert': 0,
    'break': 0,
    'class': 0,
    'continue': 0,
    'def': 0,
    'del': 0,
    'elif': 0,
    'else': 0,
    'except': 0,
    'finally': 0,
    'for': 0,
    'from': 0,
    'global': 0,
    'if': 0,
    'import': 0,
    'in': 0,
    'is': 0,
    'lambda': 0,
    'nonlocal': 0,
    'not': 0,
    'or': 0,
    'pass': 0,
    'raise': 0,
    'return': 0,
    'try': 0,
    'while': 0,
    'with': 0,
    'yield': 0
  };
  operands: Record<string, number> = {};
  n1: number = 0;
  n2: number = 0;
  N1: number = 0;
  N2: number = 0;
  LoC: number = 0;
  CLoC: number = 0;

  
  selectedFile: File | null = null;
  fileContent: string | null = null;

  H: number | null = null;
  N: number | null = null;
  n: number | null = null;
  V: number | null = null;
  D: number | null = null;
  L: number | null = null;
  E: number | null = null;
  T: number | null = null;

 
  constructor(
    public popoverController: PopoverController,
    private db: DatabaseService
  ) {
    //this.calculateMetrics();
   }

  ngOnInit() {
    this.db.getTallerList().subscribe( talleres => {
      talleres.map( taller => {
       console.log(taller)
      })
    })
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.readFile();
    }
  }

  readFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        //console.log(reader.result as string)
        this.fileContent = reader.result as string;

        const lines: string[] = this.fileContent.split('\n');
        lines.forEach((line) => {
          line = line.trim();
  
          if (line.includes("'''")) {
            this.CLoC++;
            line = line.replace(line.substring(line.indexOf("'''")), '');
          }
  
          if (line.includes('#')) {
            this.CLoC++;
            line = line.replace(line.substring(line.indexOf('#')), '');
          }
  
          if (line) {
            this.LoC++;
            for (const delimiter of this.delimiters) {
              line = line.replace(delimiter, ' ');
            }
  
            const words: string[] = line.split(' ');
            words.forEach((word) => {
              if (this.operators[word] !== undefined) {
                if (this.operators[word] === 0) {
                  this.n1++;
                }
                this.operators[word]++;
                this.N1++;
              } else {
                this.N2++;
                if (this.operands[word] !== undefined) {
                  this.operands[word]++;
                } else {
                  this.operands[word] = 1;
                  this.n2++;
                }
              }
            });
          }
        });   
        this.H = this.n1 * math.log(this.n1, 2) + this.n2 * math.log(this.n2, 2);
        this.N = this.N1 + this.N2;
        this.n = this.n1 + this.n2;
        this.V = this.N * math.log(this.n, 2);
        this.D = (this.n1 / 2) * (this.N2 / this.n2);
        this.L = 1 / this.D;
        this.E = this.V * this.D;
        this.T = this.E / 18;


      };
      reader.readAsText(this.selectedFile);
    }
  }
  


  uploadFile(input: HTMLInputElement) {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          
            const storageRef = ref(this.storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  //setPerc(progress);
                  switch (snapshot.state) {
                  case 'paused':
                      console.log('Upload is paused');
                      break;
                  case 'running':
                      console.log('Upload is running');
                      break;
                      default:
                          break;
                  }
              },
              (error) => {
                  console.log(error);
              },
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      console.log(downloadURL)
                  })
              }
            )

            
        }
    }
  }
}
