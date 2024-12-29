import { useEffect, useState } from "react";
import Slide_1 from "./Slides/slide1/Slide_1.jsx";
import Slide_2 from "./Slides/slide2/Slide_2.jsx";
import { enableFullscreenToggleOnF } from "./scripts/FullscreenMode.js";
import Slide_3 from "./Slides/slide3/Slide_3.jsx";
import Slide_4 from "./Slides/slide4/Slide_4.jsx";

function App() {
    const slides = [<Slide_1 />, <Slide_2 />, <Slide_3/>, <Slide_4/>];
    const [currentSlide, setCurrentSlide] = useState(() => {
        const savedSlide = localStorage.getItem("currentSlide");
        return savedSlide !== null ? parseInt(savedSlide, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem("currentSlide", currentSlide);
    }, [currentSlide]);

    useEffect(() => {
        const cleanupFullscreen = enableFullscreenToggleOnF();

        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight") {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            } else if (event.key === "ArrowLeft") {
                setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            cleanupFullscreen();
        };
    }, [slides.length]);

    return (
        <div>
            {slides[currentSlide]}
        </div>
    );
}

export default App;
