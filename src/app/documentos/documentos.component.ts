import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController } from '@ionic/angular';
import * as math from 'mathjs';
//import * as fs from "fs";

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent  implements OnInit {
	
 
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
 
  constructor(
    public popoverController: PopoverController,
    private db: DatabaseService,
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
        const H: number = this.n1 * math.log(this.n1, 2) + this.n2 * math.log(this.n2, 2);
        const N: number = this.N1 + this.N2;
        const n: number = this.n1 + this.n2;
        const V: number = N * math.log(n, 2);
        const D: number = (this.n1 / 2) * (this.N2 / this.n2);
        const L: number = 1 / D;
        const E: number = V * D;
        const T: number = E / 18;
  
        console.log('M e t r i c a s');
        console.log(`1. Longitud Halstead o Densidad del Codigo: ${H}`);
        console.log(`2. Largo del programa: ${N}`);
        console.log(`3. Tamaño del Vocabulario del programa: ${n}`);
        console.log(`4. Volumen del programa: ${V}`);
        console.log(`5. Nivel de Dificultad: ${D}`);
        console.log(`6. Nivel de Programa: ${L}`);
        console.log(`7. Esfuerzo de Implementacion: ${E}`);
        console.log(`8. Tiempo de Entendimiento: ${T}`);
        console.log(`9. Total Líneas de Codigo: ${this.LoC}`);
        console.log(`10. Total Líneas de Codigo Comentadas: ${this.CLoC}`);





      };
      reader.readAsText(this.selectedFile);
    }
  }
  
  /* 
  onFileChoose($event): void {

    fs.readFile('Prog301.py', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const lines: string[] = data.split('\n');
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

      const H: number = this.n1 * math.log(this.n1, 2) + this.n2 * math.log(this.n2, 2);
      const N: number = this.N1 + this.N2;
      const n: number = this.n1 + this.n2;
      const V: number = N * math.log(n, 2);
      const D: number = (this.n1 / 2) * (this.N2 / this.n2);
      const L: number = 1 / D;
      const E: number = V * D;
      const T: number = E / 18;

      console.log('M e t r i c a s');
      console.log(`1. Longitud Halstead o Densidad del Codigo: ${H}`);
      console.log(`2. Largo del programa: ${N}`);
      console.log(`3. Tamaño del Vocabulario del programa: ${n}`);
      console.log(`4. Volumen del programa: ${V}`);
      console.log(`5. Nivel de Dificultad: ${D}`);
      console.log(`6. Nivel de Programa: ${L}`);
      console.log(`7. Esfuerzo de Implementacion: ${E}`);
      console.log(`8. Tiempo de Entendimiento: ${T}`);
      console.log(`9. Total Líneas de Codigo: ${this.LoC}`);
      console.log(`10. Total Líneas de Codigo Comentadas: ${this.CLoC}`);
    });
  }*/


}
