public class AnimalLocator {
    public static String getAnimalNameById(Integer id) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' + id);
        request.setMethod('GET');
        
        // Make the HTTP callout
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            Map<String, Object> jsonData = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> animalData = (Map<String, Object>) jsonData.get('animal');
            String animalName = (String) animalData.get('name');

            return animalName;
        } else {
            return 'HTTP callout failed with status code: ' + response.getStatusCode();
        }
    }
}