import { Component, OnInit } from "@angular/core";
import { EspecialistService } from "../../services/especialist/especialist.service";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
  faCamera = faCamera;
  especialista: Especialist;
  profilePic: string;
  form: FormGroup;

  constructor(
    private especialistService: EspecialistService,
    formBuilder: FormBuilder
  ) {
    especialistService.getEspecialist().subscribe((e) => {
      this.especialista = e;
      this.profilePic = e.Foto;
      this.form = formBuilder.group({
        ...e,
      });
    });
  }

  ngOnInit(): void {}

  handleUpload(imageInput: any) {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") this.profilePic = reader.result;
    };
    reader.readAsDataURL(file);
  }
  async handleSubmit() {
    const especialistValues = this.form.value;
    const result = this.especialistService
      .updateEspecialist({
        ...this.especialista,
        ...especialistValues,
        Foto: this.profilePic,
      })
      .toPromise();
    const data = await result;
    console.log(data);
  }
}
