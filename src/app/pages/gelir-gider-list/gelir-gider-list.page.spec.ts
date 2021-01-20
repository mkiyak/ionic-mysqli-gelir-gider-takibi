import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GelirGiderListPage } from './gelir-gider-list.page';

describe('GelirGiderListPage', () => {
  let component: GelirGiderListPage;
  let fixture: ComponentFixture<GelirGiderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelirGiderListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GelirGiderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
