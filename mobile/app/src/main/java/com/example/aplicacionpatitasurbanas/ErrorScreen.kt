package com.example.aplicacionpatitasurbanas

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aplicacionpatitasurbanas.ui.theme.FondoLilac
import com.example.aplicacionpatitasurbanas.ui.theme.NaranjaPatitas
import com.example.aplicacionpatitasurbanas.ui.theme.TextLight
import com.example.aplicacionpatitasurbanas.ui.theme.TextoGrisClaro
import com.example.aplicacionpatitasurbanas.ui.theme.RubikPuddles

/**
 * Pantalla de error reutilizable para toda la app.
 *
 * Muestra una ilustración temática, título, descripción y dos botones de acción.
 * Sigue el diseño del Figma con fondo navy, título naranja "Patitas Urbanas",
 * y botones pill con borde blanco.
 *
 * @param errorType Tipo de error que determina textos e ilustración
 * @param onPrimaryAction Acción del botón primario (izquierdo)
 * @param onSecondaryAction Acción del botón secundario (derecho)
 * @param primaryLabel Texto personalizado para el botón primario (null usa el default del ErrorType)
 * @param secondaryLabel Texto personalizado para el botón secundario (null usa el default del ErrorType)
 */
@Composable
fun ErrorScreen(
    errorType: ErrorType,
    onPrimaryAction: () -> Unit,
    onSecondaryAction: () -> Unit,
    primaryLabel: String? = null,
    secondaryLabel: String? = null
) {
    // Animación de entrada
    var visible by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) { visible = true }

    val alphaAnim by animateFloatAsState(
        targetValue = if (visible) 1f else 0f,
        animationSpec = tween(durationMillis = 600),
        label = "fadeIn"
    )
    val scaleAnim by animateFloatAsState(
        targetValue = if (visible) 1f else 0.8f,
        animationSpec = tween(durationMillis = 500),
        label = "scaleIn"
    )

    val resolvedPrimaryLabel = primaryLabel ?: stringResource(id = errorType.primaryButtonRes)
    val resolvedSecondaryLabel = secondaryLabel ?: stringResource(id = errorType.secondaryButtonRes)

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(FondoLilac)
            .systemBarsPadding()
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 32.dp)
                .alpha(alphaAnim),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Spacer(modifier = Modifier.height(24.dp))

            // --- Sección superior: Branding + Textos ---
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth()
            ) {
                // Logo/Título de la app
                Text(
                    text = stringResource(id = R.string.pantalla_principal_titulo),
                    style = TextStyle(
                        fontFamily = RubikPuddles,
                        fontSize = 32.sp,
                        color = NaranjaPatitas
                    ),
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Título del error
                Text(
                    text = stringResource(id = errorType.titleRes),
                    style = TextStyle(
                        fontSize = 26.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextLight
                    ),
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Descripción del error
                Text(
                    text = stringResource(id = errorType.descriptionRes),
                    style = TextStyle(
                        fontSize = 15.sp,
                        color = TextoGrisClaro,
                        lineHeight = 22.sp
                    ),
                    textAlign = TextAlign.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 8.dp)
                )
            }

            // --- Sección central: Ilustración ---
            Image(
                painter = painterResource(id = errorType.illustrationRes),
                contentDescription = stringResource(id = errorType.titleRes),
                modifier = Modifier
                    .size(260.dp)
                    .scale(scaleAnim),
                contentScale = ContentScale.Fit
            )

            // --- Sección inferior: Botones ---
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 40.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterHorizontally)
            ) {
                // Botón primario (bordes, outline)
                OutlinedButton(
                    onClick = onPrimaryAction,
                    shape = RoundedCornerShape(24.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = NaranjaPatitas
                    ),
                    border = ButtonDefaults.outlinedButtonBorder.copy(
                        // Se usa el borde por defecto que viene con OutlinedButton
                    ),
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp)
                ) {
                    Text(
                        text = resolvedPrimaryLabel,
                        style = TextStyle(
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Medium
                        )
                    )
                }

                // Botón secundario (bordes, outline)
                OutlinedButton(
                    onClick = onSecondaryAction,
                    shape = RoundedCornerShape(24.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = NaranjaPatitas
                    ),
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp)
                ) {
                    Text(
                        text = resolvedSecondaryLabel,
                        style = TextStyle(
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Medium
                        )
                    )
                }
            }
        }
    }
}
