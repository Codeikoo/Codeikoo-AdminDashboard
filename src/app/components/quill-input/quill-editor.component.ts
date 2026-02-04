import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
})
export class QuillEditorComponent implements OnInit {
  @Input() label: string = 'description';
  @Input() required: boolean = false;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit(): void {}
}
