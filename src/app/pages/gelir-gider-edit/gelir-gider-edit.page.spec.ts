import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GelirGiderEditPage } from './gelir-gider-edit.page';

describe('GelirGiderEditPage', () => {
  let component: GelirGiderEditPage;
  let fixture: ComponentFixture<GelirGiderEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelirGiderEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GelirGiderEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
