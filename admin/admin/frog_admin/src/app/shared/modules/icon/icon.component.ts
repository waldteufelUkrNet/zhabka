import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() name: string;
  @Input() color = '#919091';
  @Input() width = 15;
  @Input() height = 20;

  constructor() {}

  ngOnInit() {}
}
