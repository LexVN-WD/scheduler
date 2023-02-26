describe("Appointments", () => {

  // 1. Visits the root of our web server
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday");
  });

  // A. Booking new interview test
  it("should book an interview", () => {

    cy.visit("/");
    cy.contains("Monday");

    // A2. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();

    // A3. Enters their name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    // A4. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();

    // A5. Clicks the save button
    cy.contains("Save")
      .click();

    // A6. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  // B. Edit existing appointment test
  it("should edit an interview", () => {
    // B2. Clicks the edit button for the existing appointment
    cy.get("[alt='Edit']")
      .first()
      .click({ force: true });

    // B3. Changes the name and interviewer
    cy.get('[data-testid="student-name-input"]')
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']")
      .click();

    // B4. Clicks the save button
    cy.contains("Save")
      .click();

    // B5. Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  // C. Cancel an existing interview
  it("should cancel an interview", () => {

    // C2. Clicks the delete button for the existing appointment
    cy.get("[alt='Delete']")
      .click({ force: true });

    // C3. Clicks the confirm button
    cy.contains("Confirm")
      .click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    // C4. Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });




})