import Page from './page.js'

class RetirementCalculatorPage extends Page {
    /**
     * define elements
     */
    // Required fields
    get currentAge () { return $('#currentAge') }
    get retirementAge () { return $('#retirementAge') }
    get currentSavings () { return $('#currentSavings') }
    get monthlyContribution () { return $('#monthlyContribution') }
    get annualReturn () { return $('#annualReturn') }
    
    // Social Security fields
    get socialSecurityToggle () { return $('#socialSecurityToggle') }
    get socialSecurityAge () { return $('#socialSecurityAge') }
    get socialSecurityBenefit () { return $('#socialSecurityBenefit') }
    get socialSecurityFieldsContainer () { return $('.social-security-fields') }
    
    // Additional calculator fields
    get inflationRate () { return $('#inflationRate') }
    get lifeExpectancy () { return $('#lifeExpectancy') }
    
    // Buttons and results
    get submitButton () { return $('button[type="submit"]') }
    get calculateButton () { return $('button=Calculate') }
    get resultSection () { return $('.result-section') }
    get totalSavingsResult () { return $('.total-savings-result') }
    get retirementReadinessResult () { return $('.retirement-readiness-result') }
    get errorMessage () { return '.error-message' }

    /**
     * define or overwrite page methods
     */
    open () {
        return super.open('retirement-calculator')
    }

    /**
     * Fill required fields with provided values
     */
    async fillRequiredFields (currentAge: string, retirementAge: string, currentSavings: string, monthlyContribution: string, annualReturn: string) {
        await this.currentAge.setValue(currentAge)
        await this.retirementAge.setValue(retirementAge)
        await this.currentSavings.setValue(currentSavings)
        await this.monthlyContribution.setValue(monthlyContribution)
        await this.annualReturn.setValue(annualReturn)
    }

    /**
     * Fill optional social security fields
     */
    async fillSocialSecurityFields (socialSecurityAge: string, socialSecurityBenefit: string) {
        await this.socialSecurityAge.setValue(socialSecurityAge)
        await this.socialSecurityBenefit.setValue(socialSecurityBenefit)
    }

    /**
     * Fill additional calculator fields
     */
    async fillAdditionalFields (inflationRate: string, lifeExpectancy: string) {
        await this.inflationRate.setValue(inflationRate)
        await this.lifeExpectancy.setValue(lifeExpectancy)
    }

    /**
     * Toggle social security benefits
     */
    async toggleSocialSecurityBenefits () {
        await this.socialSecurityToggle.click()
    }

    /**
     * Submit the calculator form
     */
    async submit () {
        await this.submitButton.click()
    }

    /**
     * Click calculate button
     */
    async calculate () {
        await this.calculateButton.click()
    }

    /**
     * Check if social security fields are visible
     */
    async areSSFieldsVisible () {
        await this.socialSecurityFieldsContainer.waitForDisplayed({ timeout: 5000, reverse: false })
        return await this.socialSecurityFieldsContainer.isDisplayed()
    }

    /**
     * Check if social security fields are hidden
     */
    async areSSFieldsHidden () {
        try {
            await this.socialSecurityFieldsContainer.waitForDisplayed({ timeout: 5000, reverse: true })
            return !(await this.socialSecurityFieldsContainer.isDisplayed())
        } catch (e) {
            return true
        }
    }

    /**
     * Get the total savings result
     */
    async getTotalSavingsResult () {
        await this.totalSavingsResult.waitForDisplayed()
        return await this.totalSavingsResult.getText()
    }

    /**
     * Get the retirement readiness result
     */
    async getRetirementReadinessResult () {
        await this.retirementReadinessResult.waitForDisplayed()
        return await this.retirementReadinessResult.getText()
    }

    /**
     * Check if result section is displayed
     */
    async isResultDisplayed () {
        await this.resultSection.waitForDisplayed()
        return await this.resultSection.isDisplayed()
    }

    /**
     * Update a default calculator value
     */
    async updateCalculatorValue (fieldSelector: string, newValue: string) {
        const field = $(fieldSelector)
        await field.clearValue()
        await field.setValue(newValue)
    }

    /**
     * Get current value of a field
     */
    async getFieldValue (fieldSelector: string) {
        const field = $(fieldSelector)
        return await field.getValue()
    }
}

export default new RetirementCalculatorPage()
