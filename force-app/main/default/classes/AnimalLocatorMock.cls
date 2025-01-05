// Mock response class for simulating the HTTP response
    global class AnimalLocatorMock implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"name": "Lion"}'); // Mock response body
            res.setStatusCode(200);
            return res;
        }
    }