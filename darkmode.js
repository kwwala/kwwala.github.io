let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkMode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem('darkmode', 'enabled')
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem('darkmode', 'disabled')
}

// Verifica a preferência do sistema
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// Função para aplicar o tema baseado na preferência do sistema
const applySystemTheme = (e) => {
    if (localStorage.getItem('darkmode') === null) {
        if (e.matches) {
            enableDarkMode()
        } else {
            disableDarkMode()
        }
    }
}

// Aplica o tema salvo ou usa a preferência do sistema
if (darkmode === "enabled") {
    enableDarkMode()
} else if (darkmode === "disabled") {
    disableDarkMode()
} else {
    applySystemTheme(systemPrefersDark)
}

// Escuta mudanças na preferência do sistema
systemPrefersDark.addEventListener('change', applySystemTheme)

// Mantém o switch do tema
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "enabled" ? enableDarkMode() : disableDarkMode()
})

