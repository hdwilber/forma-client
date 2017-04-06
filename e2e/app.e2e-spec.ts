import { FormaClientPage } from './app.po';

describe('forma-client App', () => {
  let page: FormaClientPage;

  beforeEach(() => {
    page = new FormaClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
