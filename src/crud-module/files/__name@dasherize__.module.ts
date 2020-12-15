import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/_shared/shared.module';
import { SearchModule } from 'src/app/_shared/search/search.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LoadingModule } from 'src/app/_shared/loading/loading.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EnterSwitchModule } from 'src/app/_shared/global-modules/enter-switch/enter-switch.module';

import { <%= classify(name) %>TableComponent } from './<%=dasherize(name)%>-table/<%=dasherize(name)%>-table.component';
import { <%= classify(name) %>UpsertDialogComponent } from './<%=dasherize(name)%>-upsert-dialog/<%=dasherize(name)%>-upsert-dialog.component'; 
import { <%= classify(name) %>RoutingModule } from './<%=dasherize(name)%>-routing.module';
import { <%= classify(name) %>Component } from './<%=dasherize(name)%>.component';

@NgModule({
  declarations: [ <%= classify(name) %>Component,     
    <%= classify(name) %>TableComponent,
    <%= classify(name) %>UpsertDialogComponent],
  imports: [
    <%= classify(name) %>RoutingModule,
    SharedModule,
    SearchModule,
    MatMenuModule,
    MatIconModule,
    LoadingModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    EnterSwitchModule,
  ],
})
export class <%= classify(name) %>Module {}
