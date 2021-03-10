import { By } from "selenium-webdriver"

export default class LoginPage {
  emailInput = By.name('email')
  passwordInput = By.name('password')
  errorEmailMessage = By.xpath("//div[@data-test-component='field__error errorMessage']/div[2]")
  errorPasswordMessage = By.xpath("(//div[@data-test-component='field__error errorMessage'])[2]")
  cookieAcceptButton = By.xpath("//button[@title='Accept']")
  nextButton = By.xpath("//button[@title='Next']")
  loginButton=By.xpath("//button[@title='Log in']")
}