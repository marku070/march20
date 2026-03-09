import { motion } from "framer-motion";
import { galleryItems } from "../data/gallery";

const Gallery = () => {
  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-display text-foreground mb-2">
            Photos📸
          </h1>
          <p className="text-muted-foreground font-body">
            All your bad (some good) photos on my phone
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 1) }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border transition-shadow duration-300 group-hover:shadow-xl">
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                  {/\.(mp4|mov|webm)$/i.test(item.src) ? (
                    <video
                      src={item.src}
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                      playsInline
                    />
                  ) : /\.(jpe?g|png|gif|webp)$/i.test(item.src) ? (
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).parentElement!.innerHTML =
                          '<div class="flex items-center justify-center w-full h-full text-muted-foreground text-3xl">📷</div>';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground text-3xl">
                      📷
                    </div>
                  )}
                </div>
                <p className="px-3 py-2.5 text-xs sm:text-sm text-foreground font-body text-center truncate">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
