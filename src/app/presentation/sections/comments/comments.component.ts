import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
    selector: "app-comment",
    imports: [],
    templateUrl: "./comments.component.html",
    styleUrl: "./comments.component.sass"
})
export class CommentsComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    const d = this.document,
      s = d.createElement("script");
    s.src = "https://cdn.commento.io/js/commento.js";
    s.setAttribute("data-timestamp", new Date().getTime().toString());
    (d.head || d.body).appendChild(s);
  }
}
