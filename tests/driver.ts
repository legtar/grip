import { path } from 'chromedriver'
import { Builder, WebDriver } from "selenium-webdriver";
import { Options, ServiceBuilder } from 'selenium-webdriver/chrome';

export async function createDriver(): Promise<WebDriver> {
  const options: Options = new Options();
  process.env.HEADLESS === 'true' ? options.addArguments('--no-sandbox', '--headless', '--disable-gpu', '--disable-translate', '--disable-extensions'): null;
  const serviceBuilder = new ServiceBuilder(process.env.CI === 'true' ? '/usr/bin/chromedriver': path);
  return new Builder()
    .forBrowser(process.env.BROWSER)
    .setChromeService(serviceBuilder)
    .setChromeOptions(options)
    .build();
};
