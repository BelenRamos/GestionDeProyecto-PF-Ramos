$(function() {
    var subscriptionKey = "3765041368cd44999fde5dad68499c10"; // Tu clave de suscripción

    var params = {
        // Parámetros de solicitud específicos de la API de UNESCO
        "detail": "full",
        "references": "none",
        "format": "{string}",
        "locale": "{string}",
        "partial": "{boolean}",
        "includeMetadataAnnotations": "{boolean}",
        // Otros parámetros requeridos por la API
    };

    $.ajax({
        url: "https://api.uis.unesco.org/sdmx/agencyscheme/{agencyID}/{resourceID}/{version}?" + $.param(params),
        beforeSend: function(xhrObj) {
            // Encabezados de solicitud
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "GET"
    })
    .done(function(data) {
        // Manejo exitoso de la respuesta
        console.log("Éxito");
        console.log(data); // Aquí puedes manipular los datos obtenidos

        // Por ejemplo, para insertar los datos en un div con id "dataContainer"
        var dataContainer = document.getElementById('dataContainer');
        dataContainer.innerHTML = JSON.stringify(data); // Esto muestra los datos en formato JSON, puedes adaptarlo según la estructura de los datos obtenidos
    })
    .fail(function() {
        // Manejo de error en la solicitud
        console.log("Error");
    });
});
