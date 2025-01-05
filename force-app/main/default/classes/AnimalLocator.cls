public class AnimalLocator {
    public static String getAnimalNameById(Integer id) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' + id);
        request.setMethod('GET');
        
        // Make the HTTP callout
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            // Parse the response JSON to get the name property
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            return (String) responseMap.get('name');
        } else {
            throw new CalloutException('HTTP callout failed with status code: ' + response.getStatusCode());
        }
    }
}