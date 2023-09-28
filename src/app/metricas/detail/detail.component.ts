import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from 'src/app/services/database.service';
import { Metricas } from 'src/app/interface/metricas';
import * as math from 'mathjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {
  destinatario: string | null;
  ruta: string | null;
  programa: string | null;
  metricasD: Metricas[] = [];

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

  constructor(private route: ActivatedRoute,private file: File, private filePath: FilePath, private http: HttpClient, private db: DatabaseService) { 
    this.destinatario = this.route.snapshot.paramMap.get('programaId');
    if (this.destinatario  !== null) {
      // El valor no es nulo, puedes usarlo como una cadena de texto
      //this.db.getMetricasId(this.destinatario);
      /*
      this.db.getMetricasId(this.destinatario).subscribe(chatSnap => {
        this.metricasD = [];
      
        chatSnap.forEach(chatData => {
          const item = new Chat(chatData.payload.doc.data());
          item.id = chatData.payload.doc.id;
          this.metricasD.push(item);
        });
      
        // Aquí puedes realizar cualquier otra operación que necesites con this.recentChats
      });*/

    }
   

    this.ruta = '/assets/Prog'+this.destinatario+'.py';
  }
  
  async ngOnInit() {
    try {
      const filePath = 'assets/Prog'+this.destinatario+'.py'; // Reemplaza con la ruta correcta del archivo
      const fileContents = await this.http.get(filePath, { responseType: 'text' }).toPromise();
      if (!fileContents) {
        console.error('El contenido del archivo es indefinido. La lectura del archivo falló.');
        return; // Exit the function if the file contents are undefined.
      }

      // Dividir el contenido del archivo en líneas
      const lines: string[] = fileContents.split('\n');
      this.programa = fileContents;
      
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

      /*console.log('M e t r i c a s');
      console.log(`1. Longitud Halstead o Densidad del Codigo: ${this.H}`);
      console.log(`2. Largo del programa: ${this.N}`);
      console.log(`3. Tamaño del Vocabulario del programa: ${this.n}`);
      console.log(`4. Volumen del programa: ${this.V}`);
      console.log(`5. Nivel de Dificultad: ${this.D}`);
      console.log(`6. Nivel de Programa: ${this.L}`);
      console.log(`7. Esfuerzo de Implementacion: ${this.E}`);
      console.log(`8. Tiempo de Entendimiento: ${this.T}`);
      console.log(`9. Total Líneas de Codigo: ${this.LoC}`);
      console.log(`10. Total Líneas de Codigo Comentadas: ${this.CLoC}`);*/
  

    } catch (error) {
      console.error('Error al leer el archivo:', error);

    }
  }
  

}
