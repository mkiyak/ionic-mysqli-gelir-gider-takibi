import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GelirGiderIcerikPage } from './gelir-gider-icerik.page';

describe('GelirGiderIcerikPage', () => {
  let component: GelirGiderIcerikPage;
  let fixture: ComponentFixture<GelirGiderIcerikPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelirGiderIcerikPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GelirGiderIcerikPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
