import RetirementCalculatorPage from '../pageobjects/RetirementCalculator.page.js'

describe('Retirement Savings Calculator', () => {
    describe('Form Submission with Required Fields', () => {
        it('should allow user to submit form with all required fields filled in', async () => {
            await RetirementCalculatorPage.open()
            
            // Fill all required fields
            await RetirementCalculatorPage.fillRequiredFields(
                '30',           // current age
                '65',           // retirement age
                '100000',       // current savings
                '500',          // monthly contribution
                '7'             // annual return percentage
            )

            // Submit the form
            await RetirementCalculatorPage.submit()

            // Verify calculation results are displayed
            await expect(RetirementCalculatorPage.resultSection).toBeDisplayed()
            await expect(RetirementCalculatorPage.totalSavingsResult).toBeDisplayed()
        })

        it('should display results after submitting form with required fields', async () => {
            await RetirementCalculatorPage.open()
            
            await RetirementCalculatorPage.fillRequiredFields(
                '35',
                '60',
                '250000',
                '1000',
                '6.5'
            )

            await RetirementCalculatorPage.submit()

            // Verify results section exists and contains data
            const isResultVisible = await RetirementCalculatorPage.isResultDisplayed()
            await expect(isResultVisible).toBe(true)

            // Verify total savings result is populated
            const totalSavings = await RetirementCalculatorPage.getTotalSavingsResult()
            await expect(totalSavings).toBeTruthy()
        })

        it('should calculate retirement readiness based on provided values', async () => {
            await RetirementCalculatorPage.open()
            
            await RetirementCalculatorPage.fillRequiredFields(
                '45',
                '65',
                '500000',
                '2000',
                '7'
            )

            await RetirementCalculatorPage.submit()

            // Verify retirement readiness calculation is shown
            const readinessResult = await RetirementCalculatorPage.getRetirementReadinessResult()
            await expect(readinessResult).toBeTruthy()
        })
    })

    describe('Social Security Benefits Toggle', () => {
        it('should hide social security fields when toggle is off', async () => {
            await RetirementCalculatorPage.open()

            // Ensure social security fields are not displayed initially
            const isHidden = await RetirementCalculatorPage.areSSFieldsHidden()
            await expect(isHidden).toBe(true)
        })

        it('should display social security fields when toggle is turned on', async () => {
            await RetirementCalculatorPage.open()

            // Turn on social security toggle
            await RetirementCalculatorPage.toggleSocialSecurityBenefits()

            // Verify social security fields are now visible
            const isVisible = await RetirementCalculatorPage.areSSFieldsVisible()
            await expect(isVisible).toBe(true)

            // Verify specific fields are present
            await expect(RetirementCalculatorPage.socialSecurityAge).toBeDisplayed()
            await expect(RetirementCalculatorPage.socialSecurityBenefit).toBeDisplayed()
        })

        it('should hide social security fields when toggle is turned off', async () => {
            await RetirementCalculatorPage.open()

            // Turn on social security toggle
            await RetirementCalculatorPage.toggleSocialSecurityBenefits()
            await expect(RetirementCalculatorPage.socialSecurityFieldsContainer).toBeDisplayed()

            // Turn off social security toggle
            await RetirementCalculatorPage.toggleSocialSecurityBenefits()

            // Verify fields are hidden again
            const isHidden = await RetirementCalculatorPage.areSSFieldsHidden()
            await expect(isHidden).toBe(true)
        })

        it('should include social security benefits in calculation when enabled', async () => {
            await RetirementCalculatorPage.open()

            // Fill required fields
            await RetirementCalculatorPage.fillRequiredFields(
                '50',
                '67',
                '300000',
                '1500',
                '7'
            )

            // Enable social security
            await RetirementCalculatorPage.toggleSocialSecurityBenefits()

            // Fill social security fields
            await RetirementCalculatorPage.fillSocialSecurityFields(
                '67',           // social security age
                '2000'          // monthly benefit
            )

            // Submit and calculate
            await RetirementCalculatorPage.submit()

            // Verify calculation includes social security
            const readinessResult = await RetirementCalculatorPage.getRetirementReadinessResult()
            await expect(readinessResult).toBeTruthy()
        })

        it('should allow form submission without social security fields when toggle is off', async () => {
            await RetirementCalculatorPage.open()

            // Verify toggle is initially off
            const isHidden = await RetirementCalculatorPage.areSSFieldsHidden()
            await expect(isHidden).toBe(true)

            // Fill only required fields (no social security)
            await RetirementCalculatorPage.fillRequiredFields(
                '40',
                '65',
                '200000',
                '800',
                '6.5'
            )

            // Submit should work without social security fields
            await RetirementCalculatorPage.submit()

            await expect(RetirementCalculatorPage.resultSection).toBeDisplayed()
        })
    })

    describe('Update Default Calculator Values', () => {
        it('should allow user to update current age field', async () => {
            await RetirementCalculatorPage.open()

            const newAge = '42'
            await RetirementCalculatorPage.updateCalculatorValue('#currentAge', newAge)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#currentAge')
            await expect(updatedValue).toBe(newAge)
        })

        it('should allow user to update current savings field', async () => {
            await RetirementCalculatorPage.open()

            const newSavings = '500000'
            await RetirementCalculatorPage.updateCalculatorValue('#currentSavings', newSavings)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#currentSavings')
            await expect(updatedValue).toBe(newSavings)
        })

        it('should allow user to update monthly contribution field', async () => {
            await RetirementCalculatorPage.open()

            const newContribution = '2500'
            await RetirementCalculatorPage.updateCalculatorValue('#monthlyContribution', newContribution)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#monthlyContribution')
            await expect(updatedValue).toBe(newContribution)
        })

        it('should allow user to update annual return field', async () => {
            await RetirementCalculatorPage.open()

            const newReturn = '8.5'
            await RetirementCalculatorPage.updateCalculatorValue('#annualReturn', newReturn)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#annualReturn')
            await expect(updatedValue).toBe(newReturn)
        })

        it('should allow user to update retirement age field', async () => {
            await RetirementCalculatorPage.open()

            const newRetirementAge = '62'
            await RetirementCalculatorPage.updateCalculatorValue('#retirementAge', newRetirementAge)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#retirementAge')
            await expect(updatedValue).toBe(newRetirementAge)
        })

        it('should allow user to update inflation rate field', async () => {
            await RetirementCalculatorPage.open()

            const newInflationRate = '3.5'
            await RetirementCalculatorPage.updateCalculatorValue('#inflationRate', newInflationRate)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#inflationRate')
            await expect(updatedValue).toBe(newInflationRate)
        })

        it('should allow user to update life expectancy field', async () => {
            await RetirementCalculatorPage.open()

            const newLifeExpectancy = '95'
            await RetirementCalculatorPage.updateCalculatorValue('#lifeExpectancy', newLifeExpectancy)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#lifeExpectancy')
            await expect(updatedValue).toBe(newLifeExpectancy)
        })

        it('should recalculate results when values are updated and form is resubmitted', async () => {
            await RetirementCalculatorPage.open()

            // Initial calculation
            await RetirementCalculatorPage.fillRequiredFields(
                '30',
                '65',
                '100000',
                '500',
                '7'
            )
            await RetirementCalculatorPage.submit()

            let firstResult = await RetirementCalculatorPage.getTotalSavingsResult()
            await expect(firstResult).toBeTruthy()

            // Update values
            await RetirementCalculatorPage.currentAge.clearValue()
            await RetirementCalculatorPage.currentAge.setValue('35')

            await RetirementCalculatorPage.monthlyContribution.clearValue()
            await RetirementCalculatorPage.monthlyContribution.setValue('1000')

            // Recalculate
            await RetirementCalculatorPage.submit()

            let secondResult = await RetirementCalculatorPage.getTotalSavingsResult()
            await expect(secondResult).toBeTruthy()

            // Results should be different after updating values
            await expect(secondResult).not.toBe(firstResult)
        })

        it('should allow updating social security fields after enabling toggle', async () => {
            await RetirementCalculatorPage.open()

            // Enable social security
            await RetirementCalculatorPage.toggleSocialSecurityBenefits()

            const newAge = '70'
            await RetirementCalculatorPage.updateCalculatorValue('#socialSecurityAge', newAge)

            const updatedValue = await RetirementCalculatorPage.getFieldValue('#socialSecurityAge')
            await expect(updatedValue).toBe(newAge)
        })

        it('should allow updating multiple fields and recalculate with new values', async () => {
            await RetirementCalculatorPage.open()

            // Fill initial values
            await RetirementCalculatorPage.fillRequiredFields(
                '28',
                '65',
                '50000',
                '300',
                '6'
            )
            await RetirementCalculatorPage.submit()

            // Store original result
            const originalResult = await RetirementCalculatorPage.getTotalSavingsResult()

            // Update multiple fields to increase savings potential
            await RetirementCalculatorPage.updateCalculatorValue('#monthlyContribution', '2000')
            await RetirementCalculatorPage.updateCalculatorValue('#annualReturn', '9')

            // Resubmit
            await RetirementCalculatorPage.submit()

            // Get new result
            const updatedResult = await RetirementCalculatorPage.getTotalSavingsResult()

            // Both should be valid and different
            await expect(originalResult).toBeTruthy()
            await expect(updatedResult).toBeTruthy()
            await expect(updatedResult).not.toBe(originalResult)
        })
    })

    describe('Complete User Workflow', () => {
        it('should complete full workflow: fill form, enable SS, and update values', async () => {
            await RetirementCalculatorPage.open()

            // Step 1: Fill required fields
            await RetirementCalculatorPage.fillRequiredFields(
                '32',
                '65',
                '150000',
                '750',
                '7'
            )

            // Step 2: Enable social security
            await RetirementCalculatorPage.toggleSocialSecurityBenefits()
            await expect(RetirementCalculatorPage.socialSecurityFieldsContainer).toBeDisplayed()

            // Step 3: Fill social security fields
            await RetirementCalculatorPage.fillSocialSecurityFields(
                '67',
                '1800'
            )

            // Step 4: Fill additional fields
            await RetirementCalculatorPage.fillAdditionalFields(
                '2.5',
                '90'
            )

            // Step 5: Submit
            await RetirementCalculatorPage.submit()

            // Step 6: Verify results
            await expect(RetirementCalculatorPage.resultSection).toBeDisplayed()
            const totalSavings = await RetirementCalculatorPage.getTotalSavingsResult()
            const readiness = await RetirementCalculatorPage.getRetirementReadinessResult()

            await expect(totalSavings).toBeTruthy()
            await expect(readiness).toBeTruthy()

            // Step 7: Update a value and recalculate
            await RetirementCalculatorPage.updateCalculatorValue('#monthlyContribution', '1200')
            await RetirementCalculatorPage.submit()

            // Verify updated results
            const updatedTotalSavings = await RetirementCalculatorPage.getTotalSavingsResult()
            await expect(updatedTotalSavings).toBeTruthy()
        })
    })
})
