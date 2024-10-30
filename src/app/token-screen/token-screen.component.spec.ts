import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenScreenComponent } from './token-screen.component';

describe('TokenScreenComponent', () => {
  let component: TokenScreenComponent;
  let fixture: ComponentFixture<TokenScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
