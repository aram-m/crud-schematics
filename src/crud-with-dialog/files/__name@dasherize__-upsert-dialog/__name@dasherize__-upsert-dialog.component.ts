import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as <%=classify(name)%>Actions from '../../store/actions/<%=dasherize(name)%>.actions';

@Component({
  selector: 'app-<%=dasherize(name)%>-upsert-dialog',
  templateUrl: './<%=dasherize(name)%>-upsert-dialog.component.html',
  styleUrls: ['./<%=dasherize(name)%>-upsert-dialog.component.scss'],
})
export class <%=classify(name)%>UpsertDialogComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private facade: ConfigsFacade,
    private dialogRef: MatDialogRef,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  initialSnapshot;

  configs$ = this.facade.formConfigs$;
  

  form: FormGroup;

  buildForm(configs) {
    this.form = this.fb.group({
      uuid: [''],
      name: ['', Validators.required],
      liabilitiesAccountUUID: ['', Validators.required],
      bankName: ['', Validators.required],
      bankAccount: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  isDirty(): boolean {
    return (
      JSON.stringify(this.initialSnapshot) !== JSON.stringify(this.form.value)
    );
  }

  cancel() {
    if (this.form.value.uuid || !this.isDirty()) {
      this.dialogRef.close();
      return;
    }

    const confirmResponse = confirm(
      this.translate.instant('dialog.cancel_confirm')
    );
    if (confirmResponse) {
      this.dialogRef.close();
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;

    this.data.entity?.uuid
      ? this.store.dispatch(
        <%=classify(name)%>Actions.update({
            payload,
          })
        )
      : this.store.dispatch(
        <%=classify(name)%>Actions.add({
            payload,
          })
        );
  }

  ngOnInit() {
   // this.store.dispatch(AccountActions.query({ typeCode: '2' }));
    this.configs$.subscribe((configs) => {
      this.buildForm(configs);
      if (this.data.entity) {
        this.form.patchValue(this.data.entity);
        this.initialSnapshot = this.form.value;
      }
    });
  }
}
