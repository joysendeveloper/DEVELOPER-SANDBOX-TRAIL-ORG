@IsTest
private class AccountManagerTest {
    @TestSetup
    static void setupTestData() {
        // Create a test Account
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;

        // Create related Contacts for the test Account
        Contact testContact1 = new Contact(FirstName = 'John', LastName = 'Doe', AccountId = testAccount.Id);
        Contact testContact2 = new Contact(FirstName = 'Jane', LastName = 'Smith', AccountId = testAccount.Id);
        insert new List<Contact>{ testContact1, testContact2 };
    }

    @IsTest
    static void testGetAccount_Success() {
        // Retrieve the test Account ID
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        String testAccountId = testAccount.Id;

        // Set up the mock REST request
        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accounts/' + testAccountId + '/contacts';
        req.httpMethod = 'GET';
        RestContext.request = req;

        // Set up the mock REST response
        RestResponse res = new RestResponse();
        RestContext.response = res;

        // Call the method
        Account result = AccountManager.getAccount();

        // Assert the response
        System.assertNotEquals(null, result, 'The response should not be null.');
        System.assertEquals(testAccountId, result.Id, 'The Account ID should match.');
        System.assertEquals('Test Account', result.Name, 'The Account Name should match.');
        System.assertEquals(2, result.Contacts.size(), 'There should be two associated Contacts.');
    }

    @IsTest
    static void testGetAccount_MissingAccountId() {
        // Set up the mock REST request without an Account ID
        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accounts//contacts';
        req.httpMethod = 'GET';
        RestContext.request = req;

        // Set up the mock REST response
        RestResponse res = new RestResponse();
        RestContext.response = res;

        // Call the method
        Account result = AccountManager.getAccount();

        // Assert the response
        System.assertEquals(null, result, 'The response should be null for missing Account ID.');
        System.assertEquals(400, RestContext.response.statusCode, 'The status code should be 400.');
        System.assertEquals(
            '{"error": "Account ID is required in the URL."}',
            RestContext.response.responseBody.toString(),
            'The error message should indicate a missing Account ID.'
        );
    }

    @IsTest
    static void testGetAccount_NotFound() {
        // Set up the mock REST request with a non-existent Account ID
        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accounts/001000000000000000/contacts';
        req.httpMethod = 'GET';
        RestContext.request = req;

        // Set up the mock REST response
        RestResponse res = new RestResponse();
        RestContext.response = res;

        // Call the method
        Account result = AccountManager.getAccount();

        // Assert the response
        System.assertEquals(null, result, 'The response should be null for a non-existent Account ID.');
        System.assertEquals(404, RestContext.response.statusCode, 'The status code should be 404.');
        System.assertEquals(
            '{"error": "Account not found for the provided ID."}',
            RestContext.response.responseBody.toString(),
            'The error message should indicate the Account was not found.'
        );
    }

    @IsTest
    static void testGetAccount_ExceptionHandling() {
        // Set up the mock REST request with an invalid Account ID format
        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accounts/INVALID_ID/contacts';
        req.httpMethod = 'GET';
        RestContext.request = req;

        // Set up the mock REST response
        RestResponse res = new RestResponse();
        RestContext.response = res;

        // Call the method
        Account result = AccountManager.getAccount();

        // Assert the response
        System.assertEquals(null, result, 'The response should be null for invalid input.');
    }
}