import { IToggleState, Toggle } from './toggle';

export class ToggleExample {
  private photoBlock: HTMLDivElement | null = null;
  private photoBlockImage: HTMLImageElement | null = null;
  private photoBlockButton: HTMLButtonElement | null = null;

  constructor() {
    const photo = {
      id: 1,
      name: 'Fat Cat',
      url:
        'http://netstorage.discovery.com/feeds/brightcove/asset-stills/apl/124161359038512825301401197_FAT_CAT.jpg'
    };

    const toggle = new Toggle({ selected: false, value: photo });

    this.photoBlock = document.querySelector('.photo-block');

    if (this.photoBlock !== null) {
      this.photoBlockImage = this.photoBlock.querySelector('.photo-block--image');

      if (this.photoBlockImage !== null) {
        this.photoBlockImage.setAttribute('src', photo.url);
        this.photoBlockImage.setAttribute('alt', photo.name);

        this.photoBlockButton = this.photoBlock.querySelector('.photo-block--select');
        if (this.photoBlockButton !== null) {
          this.photoBlockButton.addEventListener('click', (event: Event) => {
            toggle.toggle();
          });
        }
      }

      toggle.onToggle.subscribe((state: IToggleState) => {
        // tslint:disable-next-line
        if (this.photoBlockImage !== null) {
          this.photoBlockImage.classList.toggle('selected');

          if (this.photoBlockButton !== null) {
            const buttonLabel = toggle.selected ? 'Selected' : 'Not Selected';
            this.photoBlockButton.innerHTML = buttonLabel;
          }
        }
      });
    }
  }
}
