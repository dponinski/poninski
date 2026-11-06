export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Runs before paint so a saved theme never flashes the wrong colors. */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
