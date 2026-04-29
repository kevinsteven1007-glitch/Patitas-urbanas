package com.example.aplicacionpatitasurbanas

/**
 * Define los tipos de error que la app puede mostrar al usuario.
 * Cada tipo tiene su título, descripción, ilustración y etiquetas de botones.
 */
enum class ErrorType(
    val titleRes: Int,
    val descriptionRes: Int,
    val illustrationRes: Int,
    val primaryButtonRes: Int,
    val secondaryButtonRes: Int
) {
    /** Error 500 - Error interno del servidor / No se pudo conectar */
    SERVER_ERROR(
        titleRes = R.string.error_500_title,
        descriptionRes = R.string.error_500_desc,
        illustrationRes = R.drawable.error_500_dog,
        primaryButtonRes = R.string.btn_inicio,
        secondaryButtonRes = R.string.btn_reintentar
    ),

    /** Error 409 - Recurso duplicado / Conflicto */
    CONFLICT(
        titleRes = R.string.error_409_title,
        descriptionRes = R.string.error_409_desc,
        illustrationRes = R.drawable.error_409_dogs,
        primaryButtonRes = R.string.btn_ver_solicitud,
        secondaryButtonRes = R.string.btn_seguir_buscando
    ),

    /** Error 404 - Recurso no encontrado */
    NOT_FOUND(
        titleRes = R.string.error_404_title,
        descriptionRes = R.string.error_404_desc,
        illustrationRes = R.drawable.error_404_cat,
        primaryButtonRes = R.string.btn_inicio,
        secondaryButtonRes = R.string.btn_buscador
    ),

    /** Error 400 - Datos inválidos / Bad Request */
    BAD_REQUEST(
        titleRes = R.string.error_400_title,
        descriptionRes = R.string.error_400_desc,
        illustrationRes = R.drawable.error_400_cat,
        primaryButtonRes = R.string.btn_volver,
        secondaryButtonRes = R.string.btn_reintentar
    );

    companion object {
        /**
         * Convierte un código HTTP a su ErrorType correspondiente.
         * Códigos no mapeados se tratan como SERVER_ERROR (500).
         */
        fun fromHttpCode(code: Int): ErrorType = when (code) {
            400 -> BAD_REQUEST
            404 -> NOT_FOUND
            409 -> CONFLICT
            else -> SERVER_ERROR
        }
    }
}
