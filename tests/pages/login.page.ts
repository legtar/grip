import { By } from "selenium-webdriver"

export default class LoginPage {
  emailInput = By.name('email')
  passwordInput = By.name('password')
  errorEmailMessage = By.xpath("//div[@data-test-component='field__error errorMessage']/div[2]")
  errorPasswordMessage = By.xpath("(//div[@data-test-component='field__error errorMessage'])[2]")
  cookieAcceptButton = By.xpath("//button[@title='Accept']")
  nextButton = By.xpath("//button[@title='Next']")
  sendLinkButton = By.xpath("//button[@title='Send the link']")
  signupButton = By.xpath("//button[@title='Sign up']")
  loginButton = By.xpath("//button[@title='Log in']")
  recoveryMessage = By.xpath("//div[@data-test-component='passwordRecoveryPage__submitMessage']")
  linkForgotPassword=By.xpath("//h5[contains(text(),'Forgot your password?')]")
}