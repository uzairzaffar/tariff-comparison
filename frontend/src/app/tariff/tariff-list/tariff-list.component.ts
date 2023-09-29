import { Component, OnInit } from '@angular/core';
import { TariffService } from '../tariff.service';

@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.css'],
})
export class TariffListComponent implements OnInit {
  tariffs: any[] = [];

  constructor(private tariffService: TariffService) {}

  ngOnInit() {
    this.tariffService.getTariffs().subscribe((data) => {
      this.tariffs = data;
    });
  }

  getTariffType(type: number): string {
    switch (type) {
      case 1:
        return 'Basic Electricity Tariff';
      case 2:
        return 'Packaged Tariff';
      // Add more cases for other tariff types if needed
      default:
        return 'Unknown Type';
    }
  }
}