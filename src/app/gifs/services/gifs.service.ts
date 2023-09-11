import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = []

  private _tagHistory: string[] = [];
  private apiKey: string = 'WI9dZ3NmMCdMrIxQ26cINjSuunaJDnnr';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  get tagHistrory() {
    return [...this._tagHistory]
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase()

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldtag) => oldtag !== tag)
    }
    this._tagHistory.unshift(tag)
    this._tagHistory = this._tagHistory.splice(0, 10)
    this.saveLocalStorage()
  }

  private saveLocalStorage(): void {
    localStorage.setItem('History', JSON.stringify(this._tagHistory))
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('History')) return

    this._tagHistory = JSON.parse(localStorage.getItem('History')!)
    if (this._tagHistory.length === 0) return

    this.searchTag(this._tagHistory[0])

    // console.log()

  }


  searchTag(tag: string): void {
    if (tag.length === 0) return
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', tag)

    // console.log({params})

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        // console.log({gifs: this.gifsList})
      })

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=WI9dZ3NmMCdMrIxQ26cINjSuunaJDnnr&q=Perro&limit=20')
    // .then(resp => resp.json())
    // .then(data => console.log(data))

    // this._tagHistory.unshift(tag)
  }
}
