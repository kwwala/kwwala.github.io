let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkMode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem('darkmode', 'enabled')
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem('darkmode', null)
}

if(darkmode === "enabled") enableDarkMode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "enabled" ? enableDarkMode() : disableDarkMode();
})

