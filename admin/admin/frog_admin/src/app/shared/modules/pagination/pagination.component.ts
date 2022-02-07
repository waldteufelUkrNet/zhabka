import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-my-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() countItems;
    @Input() showInPages = 20;
    @Output() changePage = new EventEmitter();

    pages = [];
    countPages = 0;
    activePage = 1;
    showPages = 7;

    constructor() {}

    ngOnInit() {
        this.refresh();
    }

    refresh(){
        if(this.countItems && this.countItems > this.showInPages){
            this.pages = [];
            this.countPages = Math.ceil(this.countItems / this.showInPages);

            if(this.countPages > this.showPages){
                let center = Math.ceil(this.showPages / 2);
                let start = (this.activePage > center) ? this.activePage - center + 1 : 1;
                let end = this.countPages;
                if(this.activePage <= center){
                    end = this.showPages;
                } else {
                    let tmp = this.activePage + center - 1;
                    end = tmp < this.countPages ? tmp : this.countPages;

                    if(tmp > this.countPages){
                        start = end - this.showPages + 1;
                    }
                }

                for(let i=start;i<=end;i++){
                    this.pages.push(i);
                }
            } else {
                for(let i=1;i<=this.countPages;i++){
                    this.pages.push(i);
                }
            }
        } else {
            for(let i=1;i<=this.countItems;i++){
                this.pages.push(i);
            }
        }
    }

    setPage(item){
        this.activePage = item;
        this.changePage.emit(this.activePage);
        this.refresh();
    }
}
