import { JudyNgZorooAntdPage } from './app.po';

describe('judy-ng-zoroo-antd App', () => {
  let page: JudyNgZorooAntdPage;

  beforeEach(() => {
    page = new JudyNgZorooAntdPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
