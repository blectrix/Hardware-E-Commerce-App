import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss'],
})
export class HardwareComponent implements OnInit {

  @Input() hardware;

  constructor() { }

  ngOnInit() {}

  getCuisines(data) {
    return data.join(', ');
  }
}
