describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
  });
  it('should be able to acess login page', () => {
    cy.get('form').should('be.visible');
  });

  it('should be able to navigate to new account page and go back to login page', () => {
    cy.get('[href="/signup"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/signup');
    });
    cy.get('form').should('be.visible');
    cy.get('a').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('should be able login in application', () => {
    cy.get('form').find(':nth-child(2) > input').type('vitor@email.com');
    cy.get('form').find(':nth-child(3) > input').type('123456');
    cy.get('form').submit();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/dashboard');
      expect(localStorage.getItem('@goBarber:user')).to.not.null;
      expect(localStorage.getItem('@goBarber:user')).to.not.null;
    });
  });

  it('should be able validate required fields', () => {
    cy.get('form').submit();
    cy.get(':nth-child(2) > .sc-AxjAm > svg').should('be.visible');
    cy.get(':nth-child(3) > .sc-AxjAm > svg').should('be.visible');
    cy.get(':nth-child(2) > .sc-AxjAm > span').should(
      'contain',
      'E-mail obrigatório',
    );
    cy.get(':nth-child(3) > .sc-AxjAm > span').should(
      'contain',
      'Senha obrigatória',
    );
  });

  it('should be able validate user credentials', () => {
    const errorMessage = {
      message: 'Incorrect email/password combination.',
      status: 'error',
    };
    cy.server();
    cy.route({
      method: 'POST',
      url: 'sessions',
    }).as('postLogin');

    cy.get('form').find(':nth-child(2) > input').type('vitorr@email.com');
    cy.get('form').find(':nth-child(3) > input').type('123456');
    cy.get('[data-cy=btn-login]').click();

    cy.wait('@postLogin').should(xhr => {
      expect(xhr.status).eq(401);
      expect(xhr.response.body).contain(errorMessage);
    });
  });
});
