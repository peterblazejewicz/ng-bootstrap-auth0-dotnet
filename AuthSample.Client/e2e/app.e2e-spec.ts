import { AuthSamplePage } from './app.po';

describe('auth-sample App', function() {
  let page: AuthSamplePage;

  beforeEach(() => {
    page = new AuthSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
