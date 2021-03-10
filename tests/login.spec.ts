import {  By, until, WebDriver } from "selenium-webdriver";
import * as assert from "assert";
import { waitUntil } from 'async-wait-until';
import { createDriver } from './driver'
import LoginPage from './pages/login.page'
jest.setTimeout(60000);

describe('login', () => {
  let driver: WebDriver;
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    driver = await createDriver();
    await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000, script: 3000 })
    await driver.get(process.env.URL)
    await driver.wait(until.titleIs('Grip'), 10000)   
    await driver.findElement(loginPage.cookieAcceptButton).click()
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('check error message with invalide email', async () => {
    const email = 'email346534563465345'    
    await driver.findElement(loginPage.emailInput).sendKeys(email)    
    const textError=await driver.findElement(loginPage.errorEmailMessage).getText()
    expect(textError).toEqual('Invalid email address')
  });

  it('check button next is visible with valide email', async () => {
    const email = 'email@gmail.com'    
    await driver.findElement(loginPage.emailInput).sendKeys(email)   
    const textError = await driver.findElement(loginPage.errorEmailMessage).getText()
    await driver.wait(until.elementIsVisible(await driver.findElement(loginPage.nextButton)), 10000)  
   
  });

  it('check error message with invalide password', async () => {
    const email = 'email@gmail.com'
    const password = '123456789'
    const errorMessage='Invalid email or password'
    await driver.findElement(loginPage.emailInput).sendKeys(email)    
    await driver.findElement(loginPage.nextButton).click()
    await driver.findElement(loginPage.passwordInput).sendKeys(password)
    await driver.findElement(loginPage.loginButton).click()
    await driver.wait(until.elementTextIs(await driver.findElement(loginPage.errorPasswordMessage),errorMessage), 10000)
  });

  
  it('signup new account', async () => {
    await driver.findElement(loginPage.signupButton).click()
    await driver.wait(until.titleIs('Sign up'), 5000)
  });
  
  it('request to new password', async () => {
    const email = 'email@gmail.com'
    var recoveryText1='If we find a corresponding account to the email you have specified, we will send you a password reset email shortly.'
    var recoveryText2='Please note that the password reset link expires within a few hours and do make sure your spam folder in case you don\'t receive the email shortly.'

    await driver.findElement(loginPage.emailInput).sendKeys(email)
    await driver.findElement(loginPage.nextButton).click()
    await driver.findElement(loginPage.linkForgotPassword).click()    
    await driver.findElement(loginPage.sendLinkButton).click()
    await driver.wait(until.elementTextContains(await driver.findElement(loginPage.errorPasswordMessage),recoveryText1), 10000)
    await driver.wait(until.elementTextContains(await driver.findElement(loginPage.errorPasswordMessage),recoveryText2), 10000)

  });

})
