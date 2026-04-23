package com.example.aplicacionpatitasurbanas.network

import retrofit2.Response
import retrofit2.http.*

interface PatitasApi {

    // ══════════════════════════════════════════════════════
    //  COMUNIDAD (Consejos + Recetas)
    // ══════════════════════════════════════════════════════

    @POST("api/comunidad")
    suspend fun crearPublicacion(@Body data: Map<String, Any?>): Response<ConsejoResponse>

    @GET("api/comunidad")
    suspend fun listarPublicaciones(
        @Query("tipo") tipo: String? = null,
        @Query("limit") limit: Int? = null
    ): Response<List<ConsejoResponse>>

    @GET("api/comunidad/autor/{autorId}")
    suspend fun listarPublicacionesPorAutor(
        @Path("autorId") autorId: String
    ): Response<List<ConsejoResponse>>

    @GET("api/comunidad/{id}")
    suspend fun obtenerPublicacion(@Path("id") id: String): Response<ConsejoResponse>

    @PUT("api/comunidad/{id}")
    suspend fun actualizarPublicacion(
        @Path("id") id: String,
        @Body data: Map<String, Any?>
    ): Response<ConsejoResponse>

    @PUT("api/comunidad/{id}/like")
    suspend fun toggleLikeComunidad(
        @Path("id") id: String,
        @Body data: Map<String, String>
    ): Response<ConsejoResponse>

    @POST("api/comunidad/{id}/comentarios")
    suspend fun agregarComentarioComunidad(
        @Path("id") id: String,
        @Body data: Map<String, Any?>
    ): Response<ConsejoResponse>

    @DELETE("api/comunidad/{id}")
    suspend fun eliminarPublicacion(@Path("id") id: String): Response<ConsejoResponse>

    // ══════════════════════════════════════════════════════
    //  GUARDERÍAS
    // ══════════════════════════════════════════════════════

    @POST("api/guarderias")
    suspend fun crearGuarderia(@Body data: Map<String, Any?>): Response<GuarderiaResponse>

    @GET("api/guarderias")
    suspend fun listarGuarderias(): Response<List<GuarderiaResponse>>

    @GET("api/guarderias/autor/{autorId}")
    suspend fun listarGuarderiasPorAutor(
        @Path("autorId") autorId: String
    ): Response<List<GuarderiaResponse>>

    @GET("api/guarderias/{id}")
    suspend fun obtenerGuarderia(@Path("id") id: String): Response<GuarderiaResponse>

    @PUT("api/guarderias/{id}")
    suspend fun actualizarGuarderia(
        @Path("id") id: String,
        @Body data: Map<String, Any?>
    ): Response<GuarderiaResponse>

    @PUT("api/guarderias/{id}/like")
    suspend fun toggleLikeGuarderia(
        @Path("id") id: String,
        @Body data: Map<String, String>
    ): Response<GuarderiaResponse>

    @DELETE("api/guarderias/{id}")
    suspend fun eliminarGuarderia(@Path("id") id: String): Response<GuarderiaResponse>

    @GET("api/guarderias/{id}/comentarios")
    suspend fun obtenerComentariosGuarderia(
        @Path("id") id: String
    ): Response<List<GuarderiaComentarioResponse>>

    @POST("api/guarderias/{id}/comentarios")
    suspend fun agregarComentarioGuarderia(
        @Path("id") id: String,
        @Body data: Map<String, Any?>
    ): Response<GuarderiaResponse>

    // ══════════════════════════════════════════════════════
    //  USUARIOS
    // ══════════════════════════════════════════════════════

    @POST("api/usuarios")
    suspend fun registrarUsuario(@Body data: Map<String, String>): Response<UsuarioResponse>

    @GET("api/usuarios/{uid}")
    suspend fun obtenerUsuario(@Path("uid") uid: String): Response<UsuarioResponse>
}

// ══════════════════════════════════════════════════════
//  DATA CLASSES — Responses del backend
// ══════════════════════════════════════════════════════

data class ConsejoResponse(
    val _id: String = "",
    val titulo: String = "",
    val contenido: String = "",
    val tipo: String = "",
    val alias: String = "",
    val categoria: String = "",
    val tipoMascota: String = "",
    val tipoReceta: String = "",
    val ingredientes: String = "",
    val preparacion: String = "",
    val id_autor: String = "",
    val likes: Int = 0,
    val likedBy: List<String> = emptyList(),
    val comentarios: List<ComentarioResponse> = emptyList(),
    val activo: Boolean = true,
    val createdAt: String? = null
)

data class ComentarioResponse(
    val _id: String = "",
    val id_autor: String = "",
    val autorAlias: String = "Anónimo",
    val texto: String = "",
    val fecha: String? = null
)

data class GuarderiaResponse(
    val _id: String = "",
    val nombre: String = "",
    val ubicacion: String = "",
    val direccion: String = "",
    val servicio: String = "",
    val calificacion: String = "",
    val tratoMascotas: String = "",
    val comentarios: String = "",
    val autorId: String = "",
    val likeCount: Int = 0,
    val likedBy: List<String> = emptyList(),
    val commentCount: Int = 0,
    val comentariosReview: List<GuarderiaComentarioResponse> = emptyList(),
    val createdAt: String? = null
)

data class GuarderiaComentarioResponse(
    val _id: String = "",
    val autorId: String = "",
    val autorAlias: String = "Anónimo",
    val calificacion: Int = 0,
    val titulo: String = "",
    val texto: String = "",
    val fechaCreacion: String? = null
)

data class UsuarioResponse(
    val _id: String = "",
    val uid: String = "",
    val usuario: String = "",
    val email: String = "",
    val fechaRegistro: String? = null,
    val activo: Boolean = true
)
