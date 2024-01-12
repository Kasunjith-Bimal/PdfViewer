import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { PageData } from '../Page';
import * as pdfjsLib from 'pdfjs-dist';
@Component({
  selector: 'app-sample-div',
  templateUrl: './sample-div.component.html',
  styleUrls: ['./sample-div.component.css']
})
export class SampleDivComponent {
  @ViewChildren('scrollableDivs') scrollableDivs!: QueryList<ElementRef>;
  @ViewChild('pdfPagesContainerScroll') pdfPagesContainerScroll!: ElementRef;
  currentPage : number = 1;
  allPages: PageData[] = [];
  displayPages : PageData[]= [];
  pdfUrl: string="";
  pdfDocument: any;

  /**
   *
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {
   // pdfjsLib.GlobalWorkerOptions.workerSrc = '../assets/pdfjs-dist/build/pdf.worker.mjs'
  }

  async onFilesSelected(event: any): Promise<void> {
   this.displayPages = [];
   this.allPages = [];
   let selectedFiles = event.target.files;
   for (let i = 0; i < selectedFiles.length; i++) {
     let file = selectedFiles[i];

     // this.documentService.uploadFile(selectedFiles[i]).subscribe((x: any) => {
     //   console.log(x);
     // });
     let base64String = await this.readAsDataURL(file);
   

    this.pdfUrl = base64String;
    const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
    this.pdfDocument = await loadingTask.promise;  

    //  await this.genarateAllPageArray( this.pdfUrl);
     await this.genarateAllPageArrayNew();
     this.getFiltedPageNew(this.currentPage);
    //  this.displayPages = this.getFiltedPage(this.currentPage);

    //  this.displayPages.forEach(x=>[
    //    this.generatePage(x.pageNumber)
    //  ]);
     // await this.generatePdfPages(pdfUrl);
     // await this.renderAllPages(pdfUrl);
     //genarate All Pages Array 


   }

  }

  async generatePage(pageNumber: number){
    setTimeout(async () => {
      const pdfUrl = this.pdfUrl;
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdfDocument = await loadingTask.promise;  
      
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const scale = 1.333;
      const viewport = pdfPage.getViewport({ scale });
  
      const canvasId = 'pdfCanvas_' + (pageNumber);
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  
      if (canvas) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
       // this.fitToWidth();
        pdfPage.render(renderContext);       
        //this.isDisabledDocList = false;          
      }
    }, 100);
   
  }

  async generatePageNew(pageNumber: number){
    setTimeout(async () => {
     
      const pdfDocument = this.pdfDocument;  
      
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const scale = 1.333;
      const viewport = pdfPage.getViewport({ scale });
  
      const canvasId = 'pdfCanvas_' + (pageNumber);
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  
      if (canvas) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
       // this.fitToWidth();
        pdfPage.render(renderContext);       
        //this.isDisabledDocList = false;          
      }
    }, 1000);
   
  }


  async genarateAllPageArray(base64Sitring :any){
    const pdfUrl = base64Sitring;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    let totalPages = pdfDocument.numPages;
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
     
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const canvas = document.createElement('canvas');
      const viewport = pdfPage.getViewport({ scale: 1.5 }); // Adjust scale as needed
 
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      this.allPages.push({ pageNumber: pageNumber, width: canvas.width, height:  canvas.height }); 

    }
  }

  async genarateAllPageArrayNew(){
    
    const pdfDocument = this.pdfDocument;
    let totalPages = pdfDocument.numPages;
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
     
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const canvas = document.createElement('canvas');
      const viewport = pdfPage.getViewport({ scale: 1.5 }); // Adjust scale as needed
 
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      this.allPages.push({ pageNumber: pageNumber, width: canvas.width, height:  canvas.height }); 

    }
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

  ngOnInit(): void {

    // const pageCount = 600;
    // for (let i = 1; i <= pageCount; i++) {
    //   this.allPages.push({ pageNumber: i , width: 800, height: 1000 });
    //   // if(i <= 5){
    //   //   this.displayPages.push({ pageNumber: i , width: 800, height: 1000 });
    //   // }
       
    // }
    // this.displayPages = [];
    // this.displayPages = this.getFiltedPage(this.currentPage);
    // //this.getFiltedPageNew(this.currentPage);
    // console.log(this.displayPages);
  }

  genaratePage(){

  }

  onEnter(){

     debugger;
     this.displayPages = this.getFiltedPage(this.currentPage);

     if(this.displayPages != null && this.displayPages.length > 0 ){
      this.displayPages.forEach(x=>{
        this.generatePage(x.pageNumber);
        
      })
     }
    // let entertedDisplayArray = this.getFiltedPage(this.currentPage);
    
    // let currentPageIndex = entertedDisplayArray.findIndex(x=>x.pageNumber ==this.currentPage);
    
    // const resultCurentPageAfterArry = entertedDisplayArray.slice(currentPageIndex);
    // const resultCurentPageBeforeArry = entertedDisplayArray.slice(0, currentPageIndex);


    // console.log("resultCurentPageAfterArry",resultCurentPageAfterArry);
    // console.log("resultCurentPageBeforeArry",resultCurentPageBeforeArry);
    // console.log("entertedDisplayArray",entertedDisplayArray);

    // if(resultCurentPageAfterArry != null && resultCurentPageAfterArry.length > 0){
    //   this.displayPages = [];
    //    resultCurentPageAfterArry.forEach(x=>{
    //     this.displayPages.push(x);
    //     this.generatePage(x.pageNumber);
    //   })
    // }

    // // setTimeout(() => {
    // if(resultCurentPageBeforeArry != null && resultCurentPageBeforeArry.length > 0 ){
    //   resultCurentPageBeforeArry.sort((a, b) => b.pageNumber - a.pageNumber).forEach(x=>{
      
    //       this.displayPages.unshift(x);
    //       this.generatePage(x.pageNumber);
       
      
    //   })
    // }
    setTimeout(() => {
      const scrollElement = this.pdfPagesContainerScroll.nativeElement;
      const element = this.el.nativeElement.querySelector('#pageItem'+(this.currentPage-1));
      console.log('element',element);
      scrollElement.scrollTop = element.offsetTop + element.offsetHeight;
  
    }, 500);
   


    // }, 1000);
    //  //this.displayPages = this.getFiltedPage(this.currentPage);
    // this.getFiltedPageNew(this.currentPage);
    // let currenTpageId = "pageItem"+this.currentPage;
    // this.scrollableDivs.forEach(div=>{
    //   let nativeElement= div.nativeElement
    //   console.log(nativeElement);
    //   if(nativeElement.id == currenTpageId){
    //     const scrollElement = this.pdfPagesContainerScroll.nativeElement;
    //     scrollElement.scrollTop = nativeElement.offsetTop;
    //   }
    // })

   
  }

   getFiltedPage(pageNumber : number) {
    const index = this.allPages.findIndex(x=>x.pageNumber == pageNumber);
    const elementsToMaintain = 5;
    const elementsBetween = 2;
  
    if (index !== -1) {
      const startIndex = Math.max(0, index - elementsBetween);
      const endIndex = Math.min(
        this.allPages.length,
        index + elementsToMaintain - elementsBetween
      );
      
      return this.allPages.slice(startIndex, endIndex);
    } else {
      // Handle other cases where activeElement is not in the appropriate range.
      // You may want to customize this based on your specific requirements.
      return [];
    }
  }

  getFiltedPageNew(pageNumber : number) {
    console.log("pageNumber",pageNumber);
    const index = this.allPages.findIndex(x=>x.pageNumber == pageNumber);
    const elementsToMaintain = 5;
    const elementsBetween = 2;
  
    if (index !== -1) {


      const startIndex = Math.max(0, index - elementsBetween);
      const endIndex = Math.min(
        this.allPages.length,
        index + elementsToMaintain - elementsBetween
      );
      let nextarry =  this.allPages.slice(startIndex, endIndex);
      console.log("displayArray1",this.displayPages);
      console.log("nextarry",nextarry);
      var addedElementsArray = this.findAddedElements(this.displayPages, nextarry);
      console.log("addedElementsArray",addedElementsArray);
      var removedElementsArray = this.findRemovedElements(this.displayPages, nextarry);
      console.log("removedElementsArray",removedElementsArray);

      // this.displayPages =[];
      this.displayPages = nextarry;

      if(addedElementsArray != null && addedElementsArray.length > 0){
        addedElementsArray.forEach(x=>{
          //this.generatePage(x.pageNumber);
          this.generatePageNew(x.pageNumber);
        });
      }
      // if(addedElementsArray != null && addedElementsArray.length > 0){
      //   // addedElementsArray.forEach(x=>{
      //     if(this.displayPages.length > 0){
      //       addedElementsArray.forEach(x=>{
      //         if(x.pageNumber < this.displayPages[0].pageNumber){
      //           this.displayPages.unshift(x);
      //           this.generatePage(x.pageNumber);
      //         }else{
      //           this.displayPages.push(x);
      //           this.generatePage(x.pageNumber);
      //         }
      //       })

      //     }else{
      //       addedElementsArray.forEach(x=>{
      //         this.displayPages.push(x);
      //         this.generatePage(x.pageNumber);
      //       });
      //     }
      //   // })
      // }

      // console.log("displayArray2",this.displayPages);


      // if(removedElementsArray != null && removedElementsArray.length > 0){
      //   removedElementsArray.forEach(x=>{
      //     let findIndex  = this.displayPages.findIndex(x=>x.pageNumber == x.pageNumber);

      //     if (findIndex !== -1) {
      //       // Use splice to remove the element at the found index
      //       this.displayPages.splice(findIndex, 1);
      //     }
      //   });
      // }

      console.log("displayArray3",this.displayPages);
      // return this.allPages.slice(startIndex, endIndex);
    } else {
      console.log("displayArray4",this.displayPages);
      // Handle other cases where activeElement is not in the appropriate range.
      // You may want to customize this based on your specific requirements.
      // this.displayPages =[];
    }
  }


   findAddedElements(previousArray: PageData[], nextArray: PageData[]) {
    return nextArray.filter(item => !previousArray.includes(item));
  }
  
   findRemovedElements(previousArray: PageData[], nextArray: PageData[]) {
    return previousArray.filter(item => !nextArray.includes(item));
  }

  onScrollNew(){
    const scrollElement = this.pdfPagesContainerScroll.nativeElement;
    if (scrollElement) {
      const scrollPosition = scrollElement.scrollTop;

      this.scrollableDivs.forEach((div, index) => {
        const divOffsetTop = div.nativeElement.offsetTop;
        const divHeight = div.nativeElement.offsetHeight;
  
        if (scrollPosition >= divOffsetTop && scrollPosition < divOffsetTop + divHeight) {
            console.log('Div in view:', index + 1);
            this.currentPage =  Number(div.nativeElement.id.split('pageItem')[1]);
            //this.displayPages = this.getFiltedPage(this.currentPage+1);

            this.getFiltedPageNew(this.currentPage+1);

            // this.displayPages.forEach(x=>[
            //   this.generatePage(x.pageNumber)
            // ]);
            // //this.getFiltedPageNew(this.currentPage);
            // console.log("currentPage", this.currentPage);
        }
      });
    }

  }

  onScroll() {

    const scrollElement = this.pdfPagesContainerScroll.nativeElement;
    if (scrollElement) {
      const scrollPosition = scrollElement.scrollTop;
      

       const isAtBottom = scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight;
       const isAtTop = scrollElement.scrollTop === 0;

        if (isAtBottom) {
          
          let lastElementPageNumber =  this.displayPages[this.displayPages.length-1].pageNumber;
          var findItem = this.displayPages.find(x=>x.pageNumber == lastElementPageNumber+1);
          if(findItem == undefined && findItem == null){
            this.displayPages.push({ pageNumber: (lastElementPageNumber+1) , width: 800, height: 1000 });
            this.displayPages.shift();
          }
         
        }
    
        if (isAtTop) {
          console.log("isAtTop",isAtTop);
         let firstElementPageNumber =  this.displayPages[0].pageNumber;
         console.log("firstElementPageNumber",firstElementPageNumber);
         this.displayPages.unshift({ pageNumber: (firstElementPageNumber-1) , width: 800, height: 1000 });
         this.displayPages.pop();

        }


        this.scrollableDivs.forEach((div, index) => {
          const divOffsetTop = div.nativeElement.offsetTop;
          const divHeight = div.nativeElement.offsetHeight;
    
          if (scrollPosition >= divOffsetTop && scrollPosition < divOffsetTop + divHeight) {
              console.log('Div in view:', index + 1);
              this.currentPage =  div.nativeElement.id.split('pageItem')[1];
              console.log("currentPage", this.currentPage);
          }
        });
    }
  }
}
