export const fetchAPI = async (endPoint: string, options = {}) => {
  try {
    console.log(`Realizando petición a: ${endPoint}`, options);
    const response = await fetch(endPoint, options);
    console.log(`Respuesta recibida: ${response.status} ${response.statusText}`);

    if (response.status === 401) {
      window.location.href = "/login";
      throw new Error("Sesión expirada. Inicia sesión nuevamente");
    }

    if (!response.ok) {
      const text = await response.text();
      console.error("Respuesta no exitosa:", text.substring(0, 500));
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    console.log(`Tipo de contenido: ${contentType}`);

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Respuesta no JSON:", text.substring(0, 500)); 
      throw new Error(`El servidor no devolvió un formato JSON válido. Recibido: ${contentType || 'desconocido'}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error("Error de red:", error);
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet o que el servidor esté en funcionamiento.");
    }

    if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
      console.error("Error de sintaxis en la respuesta JSON:", error);
      throw new Error("Error de conexión: El servidor devolvió una respuesta no válida. Verifica que la API esté disponible.");
    }

    console.error("Error en fetchAPI:", error);
    throw error;
  }
};