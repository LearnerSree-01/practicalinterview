import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'
import RetirementCalculatorPage from '../pageobjects/retirementcalculator.page'

describe('Retirement Calculator', () => {
    
    //Requirement:User should be able to submit form with all required fields filled in.


    it('should open the retirement calculator page', async () => {
        await RetirementCalculatorPage.open()
        await RetirementCalculatorPage.fillRetirementFields('35','60','250000','1000', '6.5' ,'10')
        await RetirementCalculatorPage.clickCalculate() 
        expect(await RetirementCalculatorPage.isResultDisplayed()).toBe(true)
        expect(await RetirementCalculatorPage.isResultMessageDisplayed()).toBe(true)
       

    })


})


