export class  Metricas {
    ruta: string;
    fecha_creacion: Date;
    titulo: string;
    H: number;
    N: number;
    n: number;
    V: number;
    D: number;
    L: number;
    E: number;
    T: number;
    LoCL: number;
    CLoC: number;
  
    constructor( chatData?: any ){
        if( chatData ){
            Object.keys( chatData ).forEach( key => {
                if ( chatData [key]){
                    this[key] = chatData[key];
                }
                
            });
        }
    }
}

