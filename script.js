function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light")
  /* if(html.classList.contains('light')) {
  html.classList.remove('light')
 } else {
  html.classList.add('light')
 } */

  const img = document.querySelector("#profile img")
  if (html.classList.contains("light")) {
    img.setAttribute("src", "./assets/avatar-perfil.jpg")
  } else {
    img.setAttribute("src", "./assets/avatar-perfil.jpg")
  }

  // Atualiza o vídeo conforme o tema
  updateBackgroundVideo()
}

// Elementos do vídeo
const bgVideo = document.getElementById("bg-video")
let videoStarted = false

// Função para atualizar o vídeo conforme o tema
function updateBackgroundVideo() {
  const isLight = document.documentElement.classList.contains("light")

  // Define qual vídeo usar baseado no tema
  const videoSrc = isLight
    ? "./assets/bg-video-light.mp4" // Para tema claro
    : "./assets/bg-video-dark.mp4" // Para tema escuro

  // Atualiza a fonte do vídeo
  if (bgVideo) {
    bgVideo.src = videoSrc

    // Se o vídeo já foi iniciado, recarrega para aplicar a mudança
    if (videoStarted) {
      bgVideo.load()
    }
  }
}

// Função para iniciar o vídeo após interação do usuário
function startVideoOnInteraction() {
  if (videoStarted) return

  videoStarted = true

  // Define o vídeo inicial baseado no tema atual
  updateBackgroundVideo()

  // Tenta reproduzir o vídeo
  const playPromise = bgVideo.play()

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Vídeo started com sucesso
        bgVideo.classList.add("active")
      })
      .catch((error) => {
        console.log("Erro ao reproduzir vídeo:", error)
      })
  }
}

// Inicia o vídeo após primeira interação do usuário
// Suporta: click, touch, mouseover, keypress, scroll
document.addEventListener("click", startVideoOnInteraction, { once: true })
document.addEventListener("touchstart", startVideoOnInteraction, { once: true })
document.addEventListener("mouseover", startVideoOnInteraction, { once: true })
document.addEventListener("keypress", startVideoOnInteraction, { once: true })
document.addEventListener("scroll", startVideoOnInteraction, { once: true })
