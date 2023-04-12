it("GET API root info page", () => {
   cy.request("GET", "/").should((response) => {
     expect(response.status).to.eq(200);
   });
 });
