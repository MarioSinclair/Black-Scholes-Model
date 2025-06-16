import { motion, useScroll } from "framer-motion";
import React from "react";

export default function ScrollBar() {
    const { scrollYProgress } = useScroll();

    return(

        <div>
            <motion.div
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    width: "100%",
                    background: "black",
                    transformOrigin: "left",
                    zIndex: 9999,
                }}
        />
        </div>

    )


}