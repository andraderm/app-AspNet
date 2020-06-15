/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SetorComponent } from './setor.component';

describe('SetorComponent', () => {
  let component: SetorComponent;
  let fixture: ComponentFixture<SetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
