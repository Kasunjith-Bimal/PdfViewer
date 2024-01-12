import { DocumentService } from './../document.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { fabric } from 'fabric';
import { DocumentPageDetails } from './DocumentPageDetails';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit  {
  @ViewChild('pdfCanvas', { static: true }) pdfCanvas!: ElementRef;
  @ViewChild('pdfStampCanvas', { static: true }) pdfStampCanvas!: ElementRef;

  @ViewChild('annotationItem') annotationItem!: ElementRef;
  @ViewChild('parentDiv') parentDiv!: ElementRef;
  @ViewChild('pdfPagesContainerScroll') pdfPagesContainerScroll!: ElementRef;
  @ViewChild('myBounds') myBounds!: ElementRef;

  pdfPages : DocumentPageDetails[] = []
  pageNumber: number = 0;
  currentPageNumber : number = 1;
  pageCounts : number = 1;
  currentPage : number = 4;
 // Initialize variables to track the current page and scale
 rectangles = [
  { left: 0, top: 0, width: 100, height: 100, fill: 'blue',pageNumber:1, id:1},
  { left: 200, top: 200, width: 150, height: 80, fill: 'red',pageNumber:2, id:2 }
  ];

  zoomLevel: number = 1.0;

  ngOnInit() {

   
  }

 

  showArray(array:any[]){
    console.log("veriabble",this.rectangles);
    console.log("parammetr",array);
  }

  onDragEnded(event: CdkDragEnd, index: number) {
    // Update the 'left' and 'top' values in the 'locations' array when dragging ends
    this.rectangles[index].left = event.source.element.nativeElement.getBoundingClientRect().left;
    this.rectangles[index].top = event.source.element.nativeElement.getBoundingClientRect().top;
  }

  async onFilesSelected(event: any): Promise<void> {

    this.pdfPages = [];
    let selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      let file = selectedFiles[i];

      // this.documentService.uploadFile(selectedFiles[i]).subscribe((x: any) => {
      //   console.log(x);
      // });
      let base64String = await this.readAsDataURL(file);
      console.log(base64String);

      let pdfUrl = base64String;
      // await this.generatePdfPages(pdfUrl);
      // await this.renderAllPages(pdfUrl);
      await this.generatePdfPagesNew(pdfUrl);
      await this.renderAllPagesNew(pdfUrl);
    }

  }


  async generatePdfPagesNew(base64Sitring :any ) {
    // const pdfUrl = '../../../assets/2.pdf'; // Update the path to match your PDF file's location
    const pdfUrl = base64Sitring;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    let numPages = pdfDocument.numPages;
    this.pageCounts = numPages;
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    
      if(pageNumber <= 3){

        const pdfPage = await pdfDocument.getPage(pageNumber);
        const canvas = document.createElement('canvas');
        const viewport = pdfPage.getViewport({ scale: 1.5 }); // Adjust scale as needed
  
        canvas.width = viewport.width;
        canvas.height = viewport.height;
      
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await pdfPage.render(renderContext);
  

        const page: DocumentPageDetails = {
          documentUniqueId :this.generateUniqueId(),
          pdfPage : canvas,
          pageNumber:pageNumber,
          width :canvas.width,
          height :canvas.height,
          base64String:pdfUrl,
          view : pageNumber <= 3 ? true: false,
          renderContext :renderContext,
          pdfPageNew:pdfPage
         };
        this.pdfPages.push(page); 

       }
    
       

    }
  }






  async generatePdfPages(base64Sitring :any ) {
    // const pdfUrl = '../../../assets/2.pdf'; // Update the path to match your PDF file's location
    const pdfUrl = base64Sitring;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    let numPages = pdfDocument.numPages;

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const canvas = document.createElement('canvas');
      const viewport = pdfPage.getViewport({ scale: 1.5 }); // Adjust scale as needed
      canvas.width = viewport.width;
      canvas.height = viewport.height;
    
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await pdfPage.render(renderContext);
      const page: DocumentPageDetails = {
        documentUniqueId :this.generateUniqueId(),
        pdfPage : canvas,
        pageNumber:pageNumber,
        width :canvas.width,
        height :canvas.height,
        base64String:pdfUrl,
        view : pageNumber <= 3 ? true: false,
        renderContext :renderContext,
        pdfPageNew:pdfPage
       };
      this.pdfPages.push(page); 
    }
  }

  
  async  renderAllPages(base64String: any) {
    const pdfUrl = base64String;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
  
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const scale = 1.5;
      const viewport = pdfPage.getViewport({ scale });
  
      const canvasId = 'pdfCanvas_' + pageNumber;
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  
      if (canvas) {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
      
        
        // Now you can add Fabric.js shapes on top of the canvas if needed
       // const fabricCanvas = new fabric.Canvas(canvasId, { width: viewport.width, height: viewport.height });
  
        // fabricCanvas.add(new fabric.Image(await canvas, {
        //  width:canvas.width,
        //  height:canvas.height
        //  }));
        // Create a rectangle on the Fabric.js canvas
        // this.rectangles.forEach(rectangle=>{
        //   if(rectangle.pageNumber == pageNumber){

        //     const rect = new fabric.Rect({
        //       left: rectangle.left, // Adjust the position as needed
        //       top: rectangle.top,
        //       width: rectangle.width, // Adjust the size as needed
        //       height: rectangle.height,
        //       fill: 'red',
        //       selectable:true // Adjust the fill color as needed
        //     });
        //     // Add the rectangle to the Fabric.js canvas
        //     fabricCanvas.add(rect);
            
        //   }
        
        // });

          // Render the PDF content on the canvas
          const renderContext = {
            canvasContext: context,
            viewport: viewport
            // fabricCanvas :fabricCanvas
          };
    
          await pdfPage.render(renderContext).promise;
    
       

        
      }
    }
  }



  async  renderPage(base64String: any,pageNumber : number) {
    const pdfUrl = base64String;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
  
   
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const scale = 1.5;
      const viewport = pdfPage.getViewport({ scale });
  
      const canvasId = 'pdfCanvas_' + pageNumber;
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  
      if (canvas) {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
          // Render the PDF content on the canvas
          const renderContext = {
            canvasContext: context,
            viewport: viewport
            // fabricCanvas :fabricCanvas
          };
    
          await pdfPage.render(renderContext).promise;
      }
  }


  async  renderAllPagesNew(base64String: any) {
    const pdfUrl = base64String;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
  
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      if(pageNumber <= 3){
        const pdfPage = await pdfDocument.getPage(pageNumber);
        const scale = 1.5;
        const viewport = pdfPage.getViewport({ scale });
    
        const canvasId = 'pdfCanvas_' + pageNumber;
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    
        if (canvas) {
          const context = canvas.getContext('2d') as CanvasRenderingContext2D;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
        
          
         
  
            // Render the PDF content on the canvas
            const renderContext = {
              canvasContext: context,
              viewport: viewport
              // fabricCanvas :fabricCanvas
            };
      
            await pdfPage.render(renderContext).promise;
      
         
  
          
        }
      }
      
    }
  }


 async showDocumentPage(pageNumber:number){
   
  }

  async onScroll(event: Event){

    const pdfContainer = this.parentDiv.nativeElement;
    if (pdfContainer) {
      const scrollPosition = pdfContainer.scrollTop;
      const pageHeight = pdfContainer.scrollHeight / this.pdfPages.length;
      const newPage = Math.ceil(scrollPosition / pageHeight) + 1;
      console.log(newPage);
      if(newPage > 3){
        this.pdfPages.forEach(async x=>{
          if(x.pageNumber == newPage){
            var canvasObj = x.pdfPage;
            console.log("Canvas",canvasObj);
           //if(!x.view){
            //await this.renderPage(x.base64String,pageNumber);
            const pdfPage = x.pdfPageNew;
            const scale = 1.5;
            const viewport = pdfPage.getViewport({ scale });
        
            const canvasId = 'pdfCanvas_' + newPage;
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        
            if (canvas) {
              const context = canvas.getContext('2d') as CanvasRenderingContext2D;
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              
          
                // Render the PDF content on the canvas
                const renderContext = {
                  canvasContext: context,
                  viewport: viewport
                  // fabricCanvas :fabricCanvas
                };
      
             await pdfPage.render(renderContext).promise;
          }

            // const loadingTask = pdfjsLib.getDocument(x.base64String);
            // const pdfDocument = await loadingTask.promise;
            // const pdfPage = await pdfDocument.getPage(newPage);

            
            console.log(canvas);
            console.log(x.pdfPageNew);

            //x.view = true;
           //}
          }
        })
      }
     
    }
  }

  async onScrollnew(){


    const pdfUrl = this.pdfPages[0].base64String;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    let numPages = pdfDocument.numPages;
    this.currentPage = this.pdfPages[this.pdfPages.length-1].pageNumber+1; 
    console.log(this.currentPage);
   // for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    
      //if(pageNumber <= 3){

        const pdfPage = await pdfDocument.getPage(this.currentPage);
        const canvas = document.createElement('canvas');
        const viewport = pdfPage.getViewport({ scale: 1.5 }); // Adjust scale as needed
  
        canvas.width = viewport.width;
        canvas.height = viewport.height;
      
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await pdfPage.render(renderContext);
  

        const page: DocumentPageDetails = {
          documentUniqueId :this.generateUniqueId(),
          pdfPage : canvas,
          pageNumber:this.currentPage,
          width :canvas.width,
          height :canvas.height,
          base64String:pdfUrl,
          view :true,
          renderContext :renderContext,
          pdfPageNew:pdfPage
         };
        this.pdfPages.push(page);
        this.renderPage(this.pdfPages[0].base64String, this.currentPage);
        //this.currentPage++;
      
      // }
    
       

  // }
   
  }


  updateCurrentPageFromScroll() {
    
  }


   generateUniqueId(): string {
    const timestamp = Date.now().toString(); // Get the current timestamp as a string
    const random = Math.random().toString(36).substr(2, 5); // Generate a random alphanumeric string
  
    return timestamp + random;
  }
    
  constructor(private renderer: Renderer2,private documentService:DocumentService, private elementRef: ElementRef){
    pdfjsLib.GlobalWorkerOptions.workerSrc = '../assets/pdfjs-dist/build/pdf.worker.js';
   }

   async readAsDataURL(file: File): Promise<string> {

    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  inBounds = true;

  myOutOfBounds = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };
  
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true,
  };

  size: any = null;
  positionResize : any = null
  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };

  //dragDiv: HTMLElement | null = null;
  //parentDiv: HTMLElement | null = null;

  left: number =0;
  top: number =0;

  dragDivOffsetX: number = 0;
  dragDivOffsetY: number =0;


  onStart(event:any,id:number){
   console.log("onStart",event);
  }

  onStop(event:any,id:number){
    console.log("onStop",event);
  }

  
  onMoving(event:any,id:number){
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
    console.log("onMoving",event);
    console.log("onMoving movingOffset",this.movingOffset);
  }

  onMoveEnd(event:any,id:number){
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
    this.rectangles.forEach(x=>{
      if(x.id ==id ){
        x.left = event.x;
        x.top = event.y;
      }
    });
    console.log("onMoveEnd",event);
    console.log("onMoveEnd endOffset",this.endOffset);
  }

  onResizeStart(event:any,id:number){
    this.size = event.size;
    this.positionResize = event.position;
    console.log("onResizeStart Size" ,this.size)
    console.log("onResionResizeStartzeStop positionResize" ,this.positionResize)
  }

  onResizeStop(event:any,id:number){
    this.size = event.size;
    this.positionResize = event.position;
    this.rectangles.forEach(x=>{
      if(x.id ==id ){
        x.width = this.size.width;
        x.height = this.size.height;
      }
    });

    console.log("onResizeStop Size" ,this.size)
    console.log("onResizeStop positionResize" ,this.positionResize)
  }

  onResizing(event:any,id:number){
    this.size = event.size;
    this.positionResize = event.position;
    console.log("onResizing Size" ,this.size)
    console.log("onResizing positionResize" ,this.positionResize)
  }

  private offsetX: number = 0;
  private offsetY: number = 0;

  onDragStart(event: any) {
    this.annotationItem.nativeElement = event.target as HTMLElement;
    
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    // console.log("onDragOver",event);
     // Required to allow dropping.
  }

  onDrop(event: DragEvent, pageNumber:number) {
    
    event.preventDefault();    
   
      if (this.annotationItem) {
        
        const rectDrag = this.annotationItem.nativeElement.getBoundingClientRect();
        const rectParent = this.parentDiv.nativeElement.getBoundingClientRect();
  
        this.left = event.clientX - rectParent.left;
        this.top = event.clientY - rectParent.top;
  
        console.log(`Mouse Release Point - Left: ${this.left}px, Top: ${this.top}px`);
      }


      if ((event.target as HTMLElement).id) {
        this.rectangles.push({
          left: event.offsetX - this.dragDivOffsetX, 
          top: event.offsetY - this.dragDivOffsetY, 
          width: 100, 
          height: 100, 
          fill: 'blue', 
          id: (this.rectangles.length + 1),
          pageNumber: pageNumber
        })
    

    }


   
    // const x = event.clientX - this.offsetX;
    // const y = event.clientY - this.offsetY;
  
    // Use x and y as the positions where the div was dropped.
    //console.log(`Dropped at X: ${x}, Y: ${y}`);
  }

  ngAfterViewInit() {
    this.parentDiv = this.elementRef.nativeElement.querySelector('#parent');
  }

  onDragEnd(event:any) {
    // console.log("onDragEnd",event);
  }

  onStartAdd(event:any){
   console.log("onStartAdd",event);
  }

  onEndAdd(event:any){
    console.log("onEndAdd",event);
  }

  getDragDivOffset(event: any){
    this.dragDivOffsetX = event.offsetX
    this.dragDivOffsetY = event.offsetY

    console.log(this.dragDivOffsetX, this.dragDivOffsetY)
  }
    // Get the canvas element
   
    // const draggable = document.querySelector('.draggable');
    // const dropContainer = document.querySelector('.drop-container');
    
    // draggable.addEventListener('dragstart', (e) => {
    //     e.dataTransfer.setData('text/plain', ''); // Necessary for the drag to work in some browsers
    // });
    
    // dropContainer.addEventListener('dragover', (e) => {
    //     e.preventDefault();
    // });
    
    // dropContainer.addEventListener('drop', (e) => {
    //     e.preventDefault();
    //     const clonedDiv = draggable.cloneNode(true); // Clone the draggable div
    //     clonedDiv.draggable = true; // Make the clone draggable
    //     dropContainer.appendChild(clonedDiv); // Append the clone to the drop container
    // });

    increaseZoom() {
      this.zoomLevel += 0.1;
    }
  

}
