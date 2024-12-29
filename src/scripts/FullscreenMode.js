function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error("Не вдалося увійти у повноекранний режим:", err);
        });
    } else {
        document.exitFullscreen().catch((err) => {
            console.error("Не вдалося вийти з повноекранного режиму:", err);
        });
    }
}

export function enableFullscreenToggleOnF() {
    const handleKeyDown = (event) => {
        if (event.key === "f" || event.key === "F") {
            toggleFullscreen();
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
}
