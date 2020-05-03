import { Component, OnInit, Input } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-add-date-modal",
  templateUrl: "./add-date-modal.component.html",
  styleUrls: ["./add-date-modal.component.css"],
})
export class AddDateModalComponent implements OnInit {
  faSearch = faSearch;
  @Input() isOpen = false;
  @Input() onClose = () => {};
  constructor() {}

  ngOnInit(): void {}
}
