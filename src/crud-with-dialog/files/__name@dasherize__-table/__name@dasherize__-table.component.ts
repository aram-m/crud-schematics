import { Component, EventEmitter, Input, Output } from '@angular/core';
import { <%= classify(name) %> } from 'src/app/store/models/<%=dasherize(name)%>.model';

@Component({
  selector: 'app-<%=dasherize(name)%>-table',
  templateUrl: './<%=dasherize(name)%>-table.component.html',
  styleUrls: ['./<%=dasherize(name)%>-table.component.scss'],
})
export class <%= classify(name) %>TableComponent {
  displayedColumns: string[] = [
    'identifier',
    'code',
    'nameInEstonian',
    'nameInEnglish',
    'type',
    'class',
    'group',
    'actions',
  ];
  @Input() data: <%= classify(name) %>.Model[];
  @Input() loading: boolean;
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  constructor() {}
}
