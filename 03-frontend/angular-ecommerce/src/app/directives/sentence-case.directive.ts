import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSentenceCase]',
  standalone: true,
})
export class SentenceCaseDirective {
  constructor(private el: ElementRef) {}
  // Listen for input events to update the text in real-time
  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.el.nativeElement.value = this.toSentenceCase(value);
  }

  // Convert UPPERCASE text to Sentence case
  private toSentenceCase(str: string): string {
    if (!str) return str;
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
