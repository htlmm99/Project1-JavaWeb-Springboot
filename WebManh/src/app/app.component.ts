import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebManh';

  spMoi = [
  {
  	id: 1,
  	name: "ÁO KHOÁC DENIM PHỐI LÔNG CỪU",
  	img : "/assets/images/8246302505_2_1_1.jpg",
  	price: "1.999.000",
  	sl: 10,
  },
    {
  	id: 2,
  	name: "ÁO KHOÁC NHUNG TẰM",
  	img : "/assets/images/0387301712_1_1_1.jpg",
  	price: "1.199.000",
  	sl: 10,
  },
      {
  	id: 3,
  	name: "ÁO KHOÁC HAI MẶT",
  	img : "/assets/images/0706209709_1_1_1.jpg",
  	price: "3.199.000",
  	sl: 10,
  },
      {
  	id: 4,
  	name: "ÁO KHOÁC KẺ CARO",
  	img : "/assets/images/1821369600_2_1_1.jpg",
  	price: "1.599.000",
  	sl: 10,
  },
      {
  	id: 5,
  	name: "ÁO KHOÁC DA DÁNG BIKER",
  	img : "/assets/images/9953301800_2_1_1.jpg",
  	price: "4.199.000",
  	sl: 10,
  },
      {
  	id: 6,
  	name: "ÁO KHOÁC KANGAROO",
  	img : "/assets/images/5252392701_1_1_1.jpg",
  	price: "1.199.000",
  	sl: 30,
  }

  ];
}
