var dragAndDrop = require('html-dnd').codeForSelectors;
module.exports = {
  'Demo of Quiz' : function(browser) {browser
    .url('http://localhost:8000/')
    .waitForElementVisible('body')
    .assert.titleContains('Quiz')

    //course title
    .assert.not.containsText("body", "undefined")
    .click('button[id=btn]')

    //unit title
    .assert.not.containsText("body", "undefined")
    .click('button[id=btn]')

    //lesson title
    .assert.not.containsText("body", "undefined")
    .click('button[id=btn]')

    //module title
    .assert.not.containsText("body", "undefined")
    .click('button[id=btn]')

    //info slides
    .assert.not.containsText("body", "undefined")
    .click('button[id=btn]')
    .click('button[id=btn]')
    .click('button[id=btn]')

    .click('button[id=btn0]')
    //test for green here
    .click('button[id=btn]')
    .click('button[id=btn0]')
    //test for red here
    .click('button[id=btn]')
    .click('button[id=btn0]')
    //test for red here
    .click('button[id=btn]')

    //vocab
    .assert.not.containsText("body", "undefined")
    .click('button[id=btn0]')
    .assert.cssProperty("#btn0", 'background-color', "rgba(0, 128, 0, 1)")
    .click('button[id=btn]')
    .click('button[id=btn0]')
    .assert.cssProperty("#btn0", 'background-color', "rgba(255, 0, 0, 1)")
    .click('button[id=btn]')
    .click('button[id=btn2]')
    .click('button[id=btn]')
    .click('button[id=btn3]')
    .click('button[id=btn]')
    .click('button[id=btn0]')
    .click('button[id=btn]')

    //sort
    .click('button[id=btn]')
    .click('button[id=btn]')

    //imap
    .click('#blue')
    .click('button[id=btn]')

    //mc 1
    .assert.not.containsText("body", "undefined")
    .assert.containsText("body", "lecture is so boring")
    .assert.visible('button[id=btn1]')
    .click('button[id=btn1]')
    .assert.visible('button[id=btn]')
    .click('button[id=btn]')

    //gap 1
    .assert.not.containsText("body", "undefined")
    .assert.visible('#fill0')
    .assert.visible('#fill1')
    .assert.visible('#fill2')
    .assert.visible('#gap0')
    .assert.visible('#gap1')
    .assert.visible('#gap2')
    .assert.containsText('#remaining','3')
    .execute(dragAndDrop, ['#fill2', '#gap2'])
    .assert.containsText('#remaining','2')
    .execute(dragAndDrop, ['#fill0', '#gap0'])
    .assert.containsText('#remaining','1')
    .execute(dragAndDrop, ['#fill1', '#gap1'])
    .assert.containsText('#remaining','0')
    .assert.cssProperty("#ans0", 'background-color', "rgba(0, 128, 0, 1)")
    .assert.cssProperty("#ans1", 'background-color', "rgba(0, 128, 0, 1)")
    .assert.cssProperty("#ans2", 'background-color', "rgba(0, 128, 0, 1)")
    .assert.visible('button[id=btn]')
    .assert.containsText("body", "Number correct: 3")
    .assert.containsText("body", "Number questions: 3")
    .assert.containsText("body", "100%")
    .assert.visible('button[id=btn]')
    .click('button[id=btn]')

    //gap 2
    .assert.not.containsText("body", "undefined")
    .assert.visible('#fill0')
    .assert.visible('#fill1')
    .assert.visible('#fill2')
    .assert.visible('#gap0')
    .assert.visible('#gap1')
    .assert.visible('#gap2')
    .assert.containsText('#remaining','3')
    .execute(dragAndDrop, ['#fill2', '#gap1'])
    .assert.containsText('#remaining','2')
    .execute(dragAndDrop, ['#fill0', '#gap0'])
    .assert.containsText('#remaining','1')
    .execute(dragAndDrop, ['#fill1', '#gap2'])
    .assert.containsText('#remaining','0')
    .assert.cssProperty("#ans1", 'background-color', "rgba(255, 0, 0, 1)")
    .assert.cssProperty("#ans0", 'background-color', "rgba(0, 128, 0, 1)")
    .assert.cssProperty("#ans2", 'background-color', "rgba(255, 0, 0, 1)")
    .assert.visible('button[id=btn]')
    .assert.containsText("body", "Number correct: 1")
    .assert.containsText("body", "Number questions: 3")
    .assert.containsText("body", "33%")
    .assert.visible('button[id=btn]')
    // .pause(99999999)
    .click('button[id=btn]')
    .assert.visible('button[id=btn]')

    //select
    .assert.not.containsText("body", "undefined")
    .click('[id="w4"]')
    .click('[id="w6"]')
    .click('button[id=btn]')
    .assert.cssProperty("#w4", 'text-decoration-color', "rgb(255, 0, 0)")
    .assert.cssProperty("#w5", 'text-decoration-color', "rgb(255, 0, 0)")
    .assert.cssProperty("#w6", 'text-decoration-color', "rgb(0, 128, 0)")
    .assert.visible('button[id=btn]')
    .click('button[id=btn]')

    //mc 2
    .assert.not.containsText("body", "undefined")
    .assert.containsText("body", "learn the periodic table")
    .assert.visible('button[id=btn1]')
    .click('button[id=btn0]')
    .assert.visible('button[id=btn]')
    .click('button[id=btn]')

    // .pause(999999)

    //results
    .assert.not.containsText("body", "undefined")
    .assert.containsText("body", "b,a,c,d")
    .assert.containsText("body", "blue")
    .assert.containsText("body", "hadn't")
    .assert.containsText("body", "NUMBER OF QUESTIONS: 16")
    .assert.containsText("body", "NUMBER CORRECT: 10")
    .assert.containsText("body", "PERCENT CORRECT: 63%")
    .assert.containsText("body", "15.")
    .assert.containsText("body", "ans")
    .end()
  ;}
};