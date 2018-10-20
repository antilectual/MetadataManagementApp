import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldPage } from './hello-world.page';

describe('HelloWorldPage', () => {
  let component: HelloWorldPage;
  let fixture: ComponentFixture<HelloWorldPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloWorldPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
