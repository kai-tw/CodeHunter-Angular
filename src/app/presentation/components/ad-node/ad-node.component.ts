import { Component } from '@angular/core';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

@Component({
    selector: 'app-ad-node',
    imports: [],
    templateUrl: './ad-node.component.html',
    styleUrl: './ad-node.component.sass'
})
export class AdNodeComponent {
  protected clientId: string = "ca-pub-1579558558142906";
  protected format: string = "auto";
  protected slotId: string = "6674295779";
  protected isResponsive: boolean = true;

  ngAfterViewInit() {
    (window.adsbygoogle || []).push({});
  }
}
