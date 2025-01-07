@RestResource(urlMapping='/Accounts/*/contacts')
global with sharing class AccountManager {
    
    @HttpGet
    global static Account getAccount() {
        // Retrieve the Account ID from the URL
        RestRequest req = RestContext.request;
        String[] urlParts = req.requestURI.split('/');
        
        if (urlParts.size() < 3 || String.isEmpty(urlParts[urlParts.size() - 2])) {
            // Handle missing or invalid Account ID
            RestContext.response.statusCode = 400;
            RestContext.response.responseBody = Blob.valueOf('{"error": "Account ID is required in the URL."}');
            return null;
        }
        
        String accountId = urlParts[urlParts.size() - 2];
        
        try {
            // Fetch the Account and its related Contacts
            Account acc = [
                SELECT Id, Name, (SELECT Id, Name FROM Contacts)
                FROM Account
                WHERE Id = :accountId
                LIMIT 1
            ];
            
            return acc;
        } catch (QueryException e) {
            // Handle case when the Account is not found
            RestContext.response.statusCode = 404;
            RestContext.response.responseBody = Blob.valueOf('{"error": "Account not found for the provided ID."}');
            return null;
        }
    }
}