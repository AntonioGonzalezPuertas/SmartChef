import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonInput, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule, IonItem, IonInput],
})
export class SearchComponent implements OnInit {
  @Input() public items: any[] = [];
  @Input() public criteaires: any[] = [];
  @Input() public selectedCategories: any[] = [];
  @Output() public filteredItems = new EventEmitter<any[]>();

  public searchTerm: string = '';

  constructor() {}

  ngOnInit() {
    this.updateFilteredItems();
  }

  ngOnChanges() {
    this.updateFilteredItems(); // or any logic you want to run on input change
  }

  public filterItems() {
    if (this.searchTerm.length === 0 && this.selectedCategories.length === 0) {
      return this.items;
    }
    const lowerCaseTerm: any[] = this.searchTerm.toLowerCase().split(' ');
    return this.items.filter((item) => {
      let match = false;
      for (let term of lowerCaseTerm) {
        if (term.length > 0) {
          match =
            match ||
            item.name?.toLowerCase().includes(term) ||
            item.surname?.toLowerCase().includes(term) ||
            item.email?.toLowerCase().includes(term) ||
            item.bio?.toLowerCase().includes(term) ||
            item.title?.toLowerCase().includes(term) ||
            item.category?.toLowerCase().includes(term) ||
            item.description?.toLowerCase().includes(term) ||
            item.technologies?.some((item: any) =>
              item.name.toLowerCase().includes(term)
            );
        }
      }
      if (this.selectedCategories.length > 0) {
        match =
          match ||
          this.selectedCategories.some((tech: any) =>
            item.technologies?.some((item: any) => item.name === tech.name)
          ) ||
          this.selectedCategories.some(
            (cat: any) => item.category === cat.name
          );
      }
      return match;
    });
  }

  public updateFilteredItems() {
    const filtered = this.filterItems();
    this.filteredItems.emit(filtered); // Emit to parent
  }
}
