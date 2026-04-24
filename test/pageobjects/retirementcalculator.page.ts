import { $ } from '@wdio/globals'
import Page from './page';
import RetirementCalculatorPageSelectors from '../support/selectors/retirementCalculatotPageSelectors';
import RetirementCalculatorStrings from '../support/strings/retirementCalculatorStrings';
import { waitForDebugger } from 'node:inspector';
/**
 * sub page containing specific selectors and methods for a specific page
 */
class RetirementCalculatorPage extends Page {

   

   /**
   * Define Page Methods
   */


        public open () {
        return super.open('insights-tools/retirement-calculator.html');

        }
        
        //Fill required fields with provided values
        async fillRetirementFields (currentAge:  string, retirementAge:  string, currentIncome:  string, totalSavings:  string, annualsavings: string, plannedsavings: string) {
        await RetirementCalculatorPageSelectors.currentAge.setValue(currentAge)
        await RetirementCalculatorPageSelectors.retirementAge.setValue(retirementAge)

        await RetirementCalculatorPageSelectors.currentIncome.waitForDisplayed({ timeout: 5000 })
        await RetirementCalculatorPageSelectors.currentIncome.waitForEnabled({ timeout: 5000 })
        await RetirementCalculatorPageSelectors.currentIncome.click()
        await RetirementCalculatorPageSelectors.currentIncome.clearValue()
        await RetirementCalculatorPageSelectors.currentIncome.setValue(currentIncome)
        

        await RetirementCalculatorPageSelectors.currentTotalSavings.waitForDisplayed({ timeout: 5000 })
        await RetirementCalculatorPageSelectors.currentTotalSavings.waitForEnabled({ timeout: 5000 })
        await RetirementCalculatorPageSelectors.currentTotalSavings.click()
        await RetirementCalculatorPageSelectors.currentTotalSavings.clearValue()
        await RetirementCalculatorPageSelectors.currentTotalSavings.setValue(totalSavings)

        await RetirementCalculatorPageSelectors.currentAnnualSavings.setValue(annualsavings)
        await RetirementCalculatorPageSelectors.savingsIncreaseRate.setValue(plannedsavings)
        }

   

        //Click Calculate button
        async clickCalculate () {
        await RetirementCalculatorPageSelectors.calculateButton.click()
        }

        
        // Check if result section is displayed
     
        async isResultDisplayed () {
        await RetirementCalculatorPageSelectors.resultSection.waitForDisplayed( { timeout: 10000 } )
        return await RetirementCalculatorPageSelectors.resultSection.isDisplayed()
        }

        // Check if result section is displayed
     
        async isResultMessageDisplayed () {
        return await RetirementCalculatorPageSelectors.resultMessage.isDisplayed()
        }

     
    
}
export default new RetirementCalculatorPage();