import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitNote } from "../hooks/useQueries";

const MAX_LENGTH = 500;

export default function SubmitNoteForm() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitNote, isPending } = useSubmitNote();

  const trimmed = message.trim();
  const isValid = trimmed.length >= 5 && trimmed.length <= MAX_LENGTH;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isPending) return;

    submitNote(trimmed, {
      onSuccess: () => {
        setMessage("");
        setSubmitted(true);
        toast.success("Your love note was sent! 💕");
        setTimeout(() => setSubmitted(false), 5000);
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  }

  return (
    <section
      className="py-20 md:py-28 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.015 60) 0%, oklch(0.93 0.03 15) 100%)",
      }}
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="petal-divider mb-8">
            <span className="font-display text-3xl md:text-4xl font-bold italic text-foreground">
              Share Your Heart
            </span>
          </div>
          <p className="font-body text-muted-foreground text-base max-w-sm mx-auto leading-relaxed">
            Write a love note to the world — your words might warm a stranger's
            heart today.
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-romantic-lg border border-border/50 p-8 md:p-10 animate-scale-in">
          {/* Decorative heart */}
          <div className="flex justify-center mb-6">
            <svg
              role="img"
              aria-label="Heart"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="oklch(0.58 0.18 15)"
              style={{
                filter: "drop-shadow(0 4px 8px oklch(0.58 0.18 15 / 0.3))",
              }}
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          </div>

          {/* Success state */}
          {submitted && (
            <div
              data-ocid="note.success_state"
              className="mb-6 rounded-2xl p-4 text-center"
              style={{ background: "oklch(0.92 0.06 15 / 0.5)" }}
            >
              <p className="font-display text-lg italic text-foreground font-semibold">
                Your note is out in the world ✨
              </p>
              <p className="font-body text-sm text-muted-foreground mt-1">
                Thank you for spreading love today.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="love-note-textarea"
                className="font-body text-sm font-medium text-foreground/80 sr-only"
              >
                Your love note
              </label>
              <div className="relative">
                <Textarea
                  id="love-note-textarea"
                  data-ocid="note.textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your love note here... every word matters."
                  maxLength={MAX_LENGTH}
                  rows={5}
                  disabled={isPending}
                  className="font-body text-base resize-none rounded-xl border-border/70 bg-background/60 placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
                  style={{ paddingBottom: "2rem" }}
                />
                {/* Character count */}
                <span
                  className="absolute bottom-3 right-3 text-xs font-body tabular-nums pointer-events-none"
                  style={{
                    color:
                      trimmed.length > MAX_LENGTH * 0.9
                        ? "oklch(0.52 0.22 15)"
                        : "oklch(0.62 0.03 20)",
                  }}
                >
                  {trimmed.length}/{MAX_LENGTH}
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              data-ocid="note.submit_button"
              type="submit"
              disabled={!isValid || isPending}
              className="w-full h-12 rounded-xl font-body text-base font-semibold tracking-wide transition-all"
              style={{
                background:
                  isValid && !isPending
                    ? "linear-gradient(135deg, oklch(0.42 0.19 15), oklch(0.52 0.20 12))"
                    : undefined,
                boxShadow:
                  isValid && !isPending
                    ? "0 4px 20px oklch(0.42 0.19 15 / 0.35)"
                    : undefined,
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <svg
                    role="img"
                    aria-label="Heart"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2"
                  >
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                  </svg>
                  Send Love Note
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
