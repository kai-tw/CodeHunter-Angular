import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from "@angular/core";
import { TabComponent } from "../tab/tab.component";
import { NgForOf } from "@angular/common";
import {BadgeComponent} from "../badge/badge.component";

@Component({
  selector: "app-tabs",
  imports: [NgForOf, BadgeComponent],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.sass",
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit(): void {
    const activeTab = this.tabs.find((tab: TabComponent) => tab.isActive);
    if (!activeTab) {
      this.switchTab(this.tabs.first);
    }
  }

  switchTab(tab: TabComponent): void {
    this.tabs.forEach((t: TabComponent) => {
      t.isActive = false;
    });

    tab.isActive = true;
  }
}
