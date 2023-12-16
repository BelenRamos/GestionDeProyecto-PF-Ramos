import express from 'express';
import fetch from 'node-fetch';

const app = express();

const subscriptionKey = '3765041368cd44999fde5dad68499c10'; // Reemplaza con tu clave de suscripción

app.use(express.json());

app.get('/datos-unescoprotected', async (req, res) => {
  try {
    const response = await fetch('https://api.uis.unesco.org/sdmx/agencyscheme/{agencyID}/{resourceID}/{version}?detail=full&references=none&format={string}&locale={string}&partial={boolean}&includeMetadataAnnotations={boolean}', {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).send('Error al obtener datos');
  }
});

const puerto = 3000; // Puerto en el que se ejecutará el servidor
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en el puerto ${puerto}`);
});

