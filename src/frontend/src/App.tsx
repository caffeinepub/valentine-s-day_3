import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LoveNotesWall from "./components/LoveNotesWall";
import SubmitNoteForm from "./components/SubmitNoteForm";

export default function App() {
  return (
    <div className="min-h-screen font-body">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.99 0.008 50)",
            border: "1px solid oklch(0.85 0.05 20)",
            color: "oklch(0.22 0.04 20)",
            fontFamily: "Figtree, sans-serif",
          },
        }}
      />
      <main>
        <HeroSection />
        <LoveNotesWall />
        <SubmitNoteForm />
      </main>
      <Footer />
    </div>
  );
}
