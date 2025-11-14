import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-tab",
    imports: [CommonModule],
    templateUrl: "./tab.component.html",
    styleUrl: "./tab.component.sass"
})
export class TabComponent {
  @Input() title: string = "";
  @Input() isActive: boolean = false;
  @Input() doShowBadge: boolean = false;
}
