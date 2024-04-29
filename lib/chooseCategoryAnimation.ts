import analysis from "@/public/animations/lottie-animations/analysis.json";
import business from "@/public/animations/lottie-animations/business.json";
import programming from "@/public/animations/lottie-animations/coding.json";
import design from "@/public/animations/lottie-animations/design.json";
import marketing from "@/public/animations/lottie-animations/marketing.json";
import music from "@/public/animations/lottie-animations/music-composer.json";
import writing from "@/public/animations/lottie-animations/writing.json";
import tutoring from "@/public/animations/lottie-animations/e-learning.json";
import video from "@/public/animations/lottie-animations/video-editing.json";
import photography from "@/public/animations/lottie-animations/photography.json";

 const chooseCategoryAnimation = (categoryName: string) => {
    switch (categoryName) {
      case "analises":
        return analysis;
      case "negocios":
        return business;
      case "programacao":
        return programming;
      case "design":
        return design;
      case "marketing":
        return marketing;
      case "musica":
        return music;
      case "escrita":
        return writing;
      case "formacao":
        return tutoring;
      case "video":
        return video;
      case "fotografia":
        return photography;
    }
  };
  
  export default chooseCategoryAnimation;