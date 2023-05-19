import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private readonly storageKey = 'searchHistory';

  constructor() { }

  getSearchHistory(): string[] {
    const historyString = localStorage.getItem(this.storageKey);
    return historyString ? JSON.parse(historyString) : [];
  }

  addToSearchHistory(query: string): void {
    const history = this.getSearchHistory();
    history.unshift(query);
    const maxItems = 10;
    const updatedHistory = history.slice(0, maxItems);

    localStorage.setItem(this.storageKey, JSON.stringify(updatedHistory));
  }

  clearSearchHistory(): void {
    localStorage.removeItem(this.storageKey);
  }
}
