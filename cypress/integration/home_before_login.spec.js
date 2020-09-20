let author;
let title;
let likesNumber;
let partialUrl;
let articleIndex

describe('Home page tests before user logging in', function () {
    describe('When home page has been opened', function () {
        before(() => {
            cy.visit('')
        })
        it('then Global Feed tab is visible', () => {
            cy.get('.nav-link').contains('Global Feed')
        });

        it('then list of articles preview contains 10 elements', () => {
            cy.get('.article-preview').should('have.length', 10)
        });
    })

    describe('When user that not logged in has clicked on heart icon', () => {
        before(() => {
            articleIndex = getRandomNumber()
            cy.get('.article-preview').eq(articleIndex).within(() => {
                cy.get('.btn-outline-primary').as('like').then(($btn) => {
                    likesNumber = $btn.text()
                })
                cy.get('@like').click()
            })
        })

        it('then number of likes should not be changed', () => {
            cy.get('.article-preview .btn-outline-primary').eq(articleIndex).should('have.text', likesNumber)
        });
    })

    describe('When article preview has been clicked on', function () {
        before(() => {
            cy.get('.article-preview').eq(getRandomNumber).within(() => {
                cy.get('h1').then(($h) => {
                    title = $h.text()
                    partialUrl = title.toLowerCase().replace(/\s/g, '-')
                })
                cy.get('.author').then(($a) => {
                    author = $a.text()
                })
                cy.get('h1').click()
            })
        })

        it('then URL address contains article title', () => {
            cy.hash().should('include', partialUrl)
        });

        it('then article page should contains title in main header', () => {
            cy.get('h1').should('have.text', title)
        });

        it('then proper author name should be visible in article page', () => {
            cy.get('.author').should('have.text', author)
        });

        it('then log in or sign up request is displayed', () => {
            cy.get('div p').last().should('contain.text', 'to add comments on this article.')
        });
    })
})

function getRandomNumber() {
    return Math.floor((Math.random() * 9) + 1)
}