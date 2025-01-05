@isTest
public class AnimalLocatorTest {


    @isTest
    static void testGetAnimalNameById() {
        // Set the mock response for the HTTP callout
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());

        // Test the method with a sample ID
        String animalName = AnimalLocator.getAnimalNameById(1);
        
        // Assert that the response matches the expected value
        System.assertEquals('Lion', animalName, 'The animal name should be Lion');
    }

    @isTest
    static void testGetAnimalNameByIdWithError() {
        // Create a mock response that simulates an error
        HttpResponse res = new HttpResponse();
        res.setStatusCode(404);
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"error": "Animal not found"}');
        
        // Set the mock for HTTP callouts
        Test.setMock(HttpCalloutMock.class, new HttpCalloutMockImpl(res));

        // Expecting the method to throw an exception when response status is not 200
        try {
            AnimalLocator.getAnimalNameById(1);
            System.assert(false, 'Expected exception not thrown');
        } catch (CalloutException e) {
            System.assert(e.getMessage().contains('HTTP callout failed'), 'Exception message should contain "HTTP callout failed"');
        }
    }
    
    // Custom mock class for error handling
    private class HttpCalloutMockImpl implements HttpCalloutMock {
        private HttpResponse res;

        public HttpCalloutMockImpl(HttpResponse response) {
            this.res = response;
        }

        public HttpResponse respond(HttpRequest req) {
            return res;
        }
    }
}