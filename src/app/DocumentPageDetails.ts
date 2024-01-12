export interface DocumentPageDetails {  
     pageNumber: number
     pdfPage: HTMLCanvasElement
     documentUniqueId: string
     width: number
     height : number
     base64String:string,
     view: boolean,
     renderContext : any,
     pdfPageNew:any
}
