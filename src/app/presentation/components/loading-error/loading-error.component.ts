import { Component } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { heroExclamationCircle } from "@ng-icons/heroicons/outline";

@Component({
  selector: "app-loading-error",
  imports: [NgIconComponent],
  templateUrl: "./loading-error.component.html",
  styleUrl: "./loading-error.component.sass",
  viewProviders: [provideIcons({ heroExclamationCircle })],
})
export class LoadingErrorComponent {}
