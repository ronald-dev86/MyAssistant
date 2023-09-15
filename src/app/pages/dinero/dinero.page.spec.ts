import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DineroPage } from './dinero.page';

describe('DineroPage', () => {
  let component: DineroPage;
  let fixture: ComponentFixture<DineroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DineroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
