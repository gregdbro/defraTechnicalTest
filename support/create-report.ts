const reporter = require('cucumber-html-reporter');

reporter.generate({
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "Test Environment": "PROD",
        "Platform": process.platform,
        "Executed": "Local / CI"
    }
});
